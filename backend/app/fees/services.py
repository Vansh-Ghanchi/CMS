from sqlalchemy.orm import Session
from datetime import date

from app.students.models import Student
from app.courses.models import Course
from app.fees.models import CourseDueDate, Fee, Payment

# 🔥 GET ALL FEES (TABLE)
def get_all(db: Session, search=None, institute=None, course=None, status=None):

    students = db.query(Student).all()
    result = []

    for student in students:

        # 🔍 SEARCH
        if search and search.lower() not in student.name.lower():
            continue

        # 🎯 FILTER institute
        if institute and institute.lower() != student.Institude.lower():
            continue

        # 🎯 FILTER course
        if course and course.lower() != student.course.lower():
            continue

        # 📦 COURSE → TOTAL FEES
        course_data = db.query(Course).filter(
            Course.course_name == student.course
        ).first()

        total_fee = course_data.total_fee if course_data else 0

        # 📦 FEE RECORD
        fee = db.query(Fee).filter(Fee.student_id == student.student_id).first()

        # 🔥 अगर fee record नहीं है तो create करो
        if not fee:
            fee = Fee(
                student_id=student.student_id,
                course=student.course,
                total_fees=total_fee,
                paid_amount=0,
                pending_amount=total_fee,
                status="Pending"
            )
            db.add(fee)
            db.commit()
            db.refresh(fee)

        paid = fee.paid_amount
        pending = fee.pending_amount

        status_val = "Paid" if pending <= 0 else "Pending"

        # 🎯 FILTER status
        if status and status.lower() != status_val.lower():
            continue

        # 🔥 DUE DATE (course wise from CourseDueDate table)
        due = db.query(CourseDueDate).filter(
            CourseDueDate.course == student.course
        ).first()

        result.append({
            "student_id": student.student_id,
            "name": student.name,
            "course": student.course,
            "total_fees": total_fee,
            "paid_amount": paid,
            "pending_amount": pending,
            "due_date": due.due_date if due else None,   # 🔥 FIXED
            "status": status_val
        })

    return result


# 🔥 PAYMENT
def make_payment(db: Session, data):

    fee = db.query(Fee).filter(Fee.student_id == data.student_id).first()

    if not fee:
        return None

    fee.paid_amount += data.amount
    fee.pending_amount = fee.total_fees - fee.paid_amount

    fee.status = "Paid" if fee.pending_amount <= 0 else "Pending"

    payment = Payment(
        student_id=data.student_id,
        semester=data.semester,
        amount=data.amount,
        method=data.method,
        date=date.today(),
        status="Success"
    )

    db.add(payment)
    db.commit()
    db.refresh(fee)

    return fee


# 🔥 DUE DATE UPDATE (COURSE BASED)
def set_due_date(db: Session, data):

    existing = db.query(CourseDueDate).filter(
        CourseDueDate.course == data.course
    ).first()

    if existing:
        existing.due_date = data.due_date
    else:
        new = CourseDueDate(
            course=data.course,
            due_date=data.due_date
        )
        db.add(new)

    db.commit()

    return {"msg": "Due date updated successfully"}


# 🔥 DETAIL VIEW
def get_fee_detail(db: Session, student_id: str):

    # 🔹 STUDENT
    student = db.query(Student).filter(
        Student.student_id == student_id
    ).first()

    # 🔹 FEE RECORD
    fee = db.query(Fee).filter(
        Fee.student_id == student_id
    ).first()

    # 🔹 PAYMENTS
    payments = db.query(Payment).filter(
        Payment.student_id == student_id
    ).all()

    # 🔹 COURSE DATA
    course_data = db.query(Course).filter(
        Course.course_name == student.course
    ).first()

    total_fee = course_data.total_fee if course_data else 0

    # 🔥 DYNAMIC SEM CALCULATION (FINAL)
    duration_text = course_data.duration.lower() if course_data else ""

    years = 0

    for word in duration_text.split():
        if word.isdigit():
            years = int(word)
            break

    # fallback
    if years == 0:
        years = 1

    total_sem = years * 2

    per_sem_fee = total_fee // total_sem if total_sem else 0

    # 🔹 DUE DATE
    due = db.query(CourseDueDate).filter(
        CourseDueDate.course == student.course
    ).first()

    # 🔥 GROUP PAYMENTS BY SEMESTER
    sem_data = {}

    for pay in payments:
        sem = pay.semester

        if sem not in sem_data:
            sem_data[sem] = 0

        sem_data[sem] += pay.amount

    # 🔥 SEMESTER BREAKDOWN (DYNAMIC)
    semester_breakdown = []

    for i in range(1, total_sem + 1):
        sem_name = f"Sem {i}"

        paid = sem_data.get(sem_name, 0)
        pending = per_sem_fee - paid

        semester_breakdown.append({
            "semester": sem_name,
            "fees": per_sem_fee,
            "paid": paid,
            "pending": pending if pending > 0 else 0,
            "status": "Paid" if pending <= 0 else "Pending"
        })

    # 🔥 PAYMENT HISTORY
    payment_history = []

    for pay in payments:
        payment_history.append({
            "date": pay.date,
            "amount": pay.amount,
            "method": pay.method,
            "status": pay.status
        })

    return {
        "student_id": student.student_id,
        "name": student.name,
        "course": student.course,
        "total_pending": fee.pending_amount if fee else 0,
        "due_date": due.due_date if due else None,

        "semester_breakdown": semester_breakdown,
        "payment_history": payment_history
    }