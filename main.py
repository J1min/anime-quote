from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse

from interface import model, schemas
import database

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    try:
        db = database.SessionLocal()
        yield db
    finally:
        db.close()


def post_db(db, data):
    db.add(data)
    db.commit()
    db.refresh(data)


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.get("/script/all")
def get_all_script(db: Session = Depends(get_db)):
    quote = db.query(model.quote).all()
    print('quotequotequotequotequotequotequotequote', quote)
    return {"data": quote}
