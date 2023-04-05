import json
import requests


def parse(data):
    return json.dumps(data, ensure_ascii=False, indent=2)


response = requests.get('http://localhost:8000/quote')
if response.status_code == 200:
    data = response.json()
    print(parse(data))
else:
    print('Error:', response.status_code)
