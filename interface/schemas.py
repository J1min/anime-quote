from pydantic import BaseModel


class quote(BaseModel):
    charactor_name: str
    quote_content: str

    class Config:
        orm_mode: True
