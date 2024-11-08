from fastapi import APIRouter, HTTPException, status, Query
from models.user_model import UserUpdate, UserResponse
from services.user_service import user_service

router = APIRouter()

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: str):
    user = user_service.get_user(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.get("/", response_model=list[UserResponse])
def get_all_users(limit: int = Query(None, ge=1)):
    return user_service.get_all_users(limit=limit)

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: str, user: UserUpdate):
    updated_user = user_service.update_user(user_id, user)
    if updated_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return updated_user

@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def delete_user(user_id: str):
    success = user_service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return {"message": "User deleted successfully.", "user_id": user_id}