from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class quote(Base):
    __tablename__ = "quote"
    quote_id = Column(Integer, primary_key=True,
                      autoincrement=True, nullable=False)
    charactor_name = Column(String(30), nullable=False)
    quote_content = Column(String(255), nullable=False)
