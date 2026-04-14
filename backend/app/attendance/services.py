from sqlalchemy.orm import Session
from datetime import date
from sqlalchemy import or_
from app.students.models import Student
from app.attendance.models import Attendance


# 🔥 MAIN: GET attendance by date
def get_attendance_by_date(
    db,
    selected_date=None,
    search=None,
    institute=None,
    course=None
):

    # ✅ default today
    if not selected_date:
        selected_date = date.today()

    query = db.query(Student)

    # 🔍 SEARCH (name / email / id)
    if search:
        query = query.filter(
            or_(
                Student.name.ilike(f"%{search}%"),
                Student.email.ilike(f"%{search}%"),
                Student.student_id.ilike(f"%{search}%")
            )
        )

    # 🎯 FILTER institute
    if institute:
        query = query.filter(Student.Institude.ilike(f"%{institute}%"))   # ⚠️ spelling check

    # 🎯 FILTER course (multi select + case insensitive)
    if course:
        query = query.filter(Student.course.in_(course))

    students = query.all()

    result = []

    for student in students:
        record = db.query(Attendance).filter(
            Attendance.student_id == student.student_id,
            Attendance.date == selected_date
        ).first()

        result.append({
            "student_id": student.student_id,
            "name": student.name,
            "phone": student.phone,
            "institute": student.Institude,
            "course": student.course,
            "status": record.status if record else "ABSENT",
            "date": selected_date
        })

    return result

# 🔥 TOGGLE attendance
def toggle_attendance(db: Session, student_id: str, selected_date: date):

    record = db.query(Attendance).filter(
        Attendance.student_id == student_id,
        Attendance.date == selected_date
    ).first()

    if record:
        # toggle
        record.status = "PRESENT" if record.status == "ABSENT" else "ABSENT"
    else:
        # create new (first time click)
        record = Attendance(
            student_id=student_id,
            date=selected_date,
            status="PRESENT"
        )
        db.add(record)

    db.commit()
    db.refresh(record)

    return record


# 🔥 CALENDAR (student detail)
def get_student_attendance(db: Session, student_id: str):

    records = db.query(Attendance).filter(
        Attendance.student_id == student_id
    ).all()

    return records