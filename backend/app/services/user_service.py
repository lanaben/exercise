from typing import Optional
from bson import ObjectId
from pymongo.collection import Collection
from models.user_model import UserUpdate, UserResponse

class UserService:
    def __init__(self, collection: Collection):
        self.collection = collection

    def get_user(self, user_id: str) -> UserResponse:
        user = self.collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user["id"] = str(user["_id"])
            return UserResponse(**user)
        return None

    def get_all_users(self):
        users = []
        for user in self.collection.find():
            user["id"] = str(user["_id"])
            users.append(UserResponse(**user))
        return users

    def update_user(self, user_id: str, user_data: UserUpdate) -> Optional[UserResponse]:
        update_data = {k: v for k, v in user_data.dict().items() if v is not None}
        result = self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
        if result.modified_count == 1:
            updated_user = self.get_user(user_id)
            return updated_user
        return None

    def delete_user(self, user_id: str) -> bool:
        result = self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count == 1

from database.database import user_collection
user_service = UserService(user_collection)
