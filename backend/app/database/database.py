from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from config import settings

client = MongoClient(settings.MONGO_URI, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:

    print(f"Connection error: {e}")

db = client["exercise_db"]
user_collection = db["users"]
