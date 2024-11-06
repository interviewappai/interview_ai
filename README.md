## Docker 
- run `docker-compose up -d --build`
- open `http://localhost`


## local dev backend
- `cd backend`
- `python3 -m venv venv`
- create a .env file with the following content:
```
DEBUG=on
SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py runserver`

## local dev frontend
- `cd frontend`
- `npm install`
- `npm run dev`