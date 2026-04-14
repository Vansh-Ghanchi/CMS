from pydantic import BaseModel
from enum import Enum


class RoleEnum(str, Enum):
    ADMIN = "ADMIN"
    STUDENT_MANAGER = "STUDENT_MANAGER"
    ATTENDANCE_MANAGER = "ATTENDANCE_MANAGER"
    FEES_MANAGER = "FEES_MANAGER"
    COURSE_MANAGER = "COURSE_MANAGER"

class LoginRequest(BaseModel):
    email: str
    password: str
    role: RoleEnum   # 🔥 अब string nahi chalega


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str