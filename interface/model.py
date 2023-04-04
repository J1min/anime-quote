from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base

class quote(Base):
    __tablename__ = "quote"
    quote_id = Column(Integer, primary_key=True, autoincrement=True)
    charactor_name = Column(String(30))
    quote_content = Column(String(255))
