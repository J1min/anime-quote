from sqlalchemy import Column, String, DateTime, Integer
from typing import Optional
from pydantic import BaseModel


class quote(BaseModel):
    quote_id = int
    charactor_name = str
    quote_content = str

    class Config:
        orm_mode: True
