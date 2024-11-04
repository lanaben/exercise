from fastapi import FastAPI
from controllers.user_controller import router as user_router
# from users import insert_users

app = FastAPI()

app.include_router(user_router, prefix="/users", tags=["users"])

# @app.on_event("startup")
# def startup_event():
#     insert_users()

@app.get("/")
def read_root():
    return {"message": "Welcome to the User API"}
