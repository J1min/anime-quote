from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func, select

from interface import model, schemas
import database

app = FastAPI()

origins = ["*"]

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
    quote_list = db.query(model.quote).order_by(func.rand()).limit(1).first()
    random_quote = {
        "quote_content": quote_list.quote_content,
        "charactor_name": quote_list.charactor_name,
        "quote_id":  quote_list.quote_id,
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
