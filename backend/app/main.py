from fastapi import FastAPI
from .routers import detect

app = FastAPI()

app.include_router(detect.router)

@app.get("/")
def read_root():
    return {"message": "Hello, PlantGuard is running!"}
