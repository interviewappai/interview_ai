## Docker 
- run `docker-compose up -d --build`
- open `http://localhost`


## local dev backend
- `cd backend`
- `python3 -m venv env`
- create a .env file with the following content:
```
DEBUG=on
SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ENVIRONMENT=development
```
- create a .env.prod file with the following content:
```
DEBUG=off
SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ENVIRONMENT=production
```
- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py runserver`

## local dev frontend
- `cd frontend`
- `npm install`
- `npm run dev`