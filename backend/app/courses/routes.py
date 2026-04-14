from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.core.security import require_role
from app.courses import services, schemas

router = APIRouter(prefix="/courses", tags=["Courses"])

role_access = Depends(require_role(["COURSE_MANAGER"]))


# ✅ CREATE
@router.post("/", dependencies=[role_access])
def create(data: schemas.CourseCreate, db: Session = Depends(get_db)):
    return services.create_course(db, data)


# ✅ GET ALL
@router.get("/", dependencies=[role_access])
def get_all(
    search: str = None,
    institute: str = None,
    status: str = None,
    fee: str = None,
    faculty: str = None,
    db: Session = Depends(get_db)
):
    return services.get_courses(db, search, institute, status, fee, faculty)


# ✅ GET ONE
@router.get("/{course_id}", dependencies=[role_access])
def get_one(course_id: str, db: Session = Depends(get_db)):
    return services.get_course_detail(db, course_id)

# 🔥 UPDATE COURSE
@router.put("/{course_id}", dependencies=[role_access])
def update(course_id: str, data: schemas.CourseUpdate, db: Session = Depends(get_db)):

    result = services.update_course(db, course_id, data)

    if not result:
        raise HTTPException(status_code=404, detail="Course not found")

    return result
