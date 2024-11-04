from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    firstName: str
    lastName: str
    age: int
    gender: str
    email: EmailStr
    phone: str

class UserUpdate(BaseModel):
    firstName: Optional[str]
    lastName: Optional[str]
    age: Optional[int]
    gender: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]

class UserResponse(UserBase):
    id: str
