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


@app.get("/script")
def get_all_script(db: Session = Depends(get_db)):
    quote_list = db.query(model.quote).all()
    random_number = random.randint(0, len(quote_list) - 1)
    random_quote = {
        "quote_content": quote_list[random_number].quote_content,
        "charactor_name": quote_list[random_number].charactor_name,
        "quote_id":  quote_list[random_number].quote_id,
    }
    return {"quote": random_quote}


@app.get("/script/all")
def get_all_script(db: Session = Depends(get_db)):
    quote_list = db.query(model.quote).all()
    return {"list": quote_list}


@app.get("/script/{script_id}")
def get_script(script_id: int, db: Session = Depends(get_db)):
    quote = db.query(model.quote).filter(
        model.quote.quote_id == script_id).first()
    return {"quote": quote}


@app.post("/script")
def post_board(body: schemas.quote, db: Session = Depends(get_db)):
    scriptData = model.quote(
        quote_content=body.quote_content, charactor_name=body.charactor_name)
    post_db(db, scriptData)
    return {"code": 200, "response": "추가 완료", "Data": scriptData}
