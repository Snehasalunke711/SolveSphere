from app.routes.user import router as user_router
from fastapi import FastAPI
from app.database import engine, Base
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SolveSphere API",
    version="1.0.0"
)
app.include_router(user_router, prefix="/users", tags=["Users"])
print("MAIN FILE LOADED")

@app.get("/")
def home():
    return {
        "message": "SolveSphere Backend Running Successfully"
    }