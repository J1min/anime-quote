from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse

from interface import model, schemas
import database
import random

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


@app.get("/quote")
def get_all_quote(db: Session = Depends(get_db)):
    quote_list = db.query(model.quote).all()
    random_number = random.randint(0, len(quote_list) - 1)
    random_quote = {
        "quote_content": quote_list[random_number].quote_content,
        "charactor_name": quote_list[random_number].charactor_name,
        "quote_id":  quote_list[random_number].quote_id,
    }
    return {"quote": random_quote}


@app.get("/quote/all")
def get_all_quote(db: Session = Depends(get_db)):
    quote_list = db.query(model.quote).all()
    return {"list": quote_list}


@app.get("/quote/{quote_id}")
def get_quote(quote_id: int, db: Session = Depends(get_db)):
    quote = db.query(model.quote).filter(
        model.quote.quote_id == quote_id).first()
    return {"quote": quote}


@app.post("/quote")
def post_board(body: schemas.quote, db: Session = Depends(get_db)):
    quote_data = model.quote(
        quote_content=body.quote_content, charactor_name=body.charactor_name)
    post_db(db, quote_data)
    return {"response": "추가 완료"}
