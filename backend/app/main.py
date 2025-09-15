from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import detect

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(detect.router)

@app.get("/")
def read_root():
    return {"message": "Hello, PlantGuard is running!"}
