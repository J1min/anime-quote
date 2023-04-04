from pydantic import BaseModel


class quote(BaseModel):
    quote_id = int
    charactor_name = str
    quote_content = str
