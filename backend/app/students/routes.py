from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import require_role
from app.students import services, schemas

router = APIRouter(prefix="/students", tags=["Students"])


# 🔐 Only Student Manager
role_access = Depends(require_role(["STUDENT_MANAGER"]))


# ➕ ADD
@router.post("/", dependencies=[role_access])
def create(data: schemas.StudentCreate, db: Session = Depends(get_db)):
    return services.create_student(db, data)


# 📋 GET ALL
@router.get("/", response_model=list[schemas.StudentListResponse], dependencies=[role_access])
def get_all(
    search: str = None,
    Institude: str = None,
    course: str = None,
    status: str = None,
    db: Session = Depends(get_db)
):
    return services.get_students(db, search, Institude, course, status)


# 👁 GET ONE
@router.get("/{id}", response_model=schemas.StudentDetailResponse, dependencies=[role_access])
def get_one(id: int, db: Session = Depends(get_db)):
    student = services.get_student(db, id)

    if not student:
        raise HTTPException(404, "Student not found")

    return student


# ✏️ UPDATE
@router.put("/{id}", dependencies=[role_access])
def update(id: int, data: schemas.StudentUpdate, db: Session = Depends(get_db)):
    student = services.update_student(db, id, data)

    if not student:
        raise HTTPException(404, "Student not found")

    return student


# ❌ DELETE
@router.delete("/{id}", dependencies=[role_access])
def delete(id: int, db: Session = Depends(get_db)):
    result = services.delete_student(db, id)

    if not result:
        raise HTTPException(404, "Student not found")

    return {"message": "Deleted"}