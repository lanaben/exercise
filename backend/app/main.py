from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.user_controller import router as user_router
from users import insert_users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user_router, prefix="/users", tags=["users"])

# This was used to fill the database with users
@app.on_event("startup")
def startup_event():
    insert_users()

@app.get("/")
def read_root():
    return {"message": "Welcome to the User API"}
