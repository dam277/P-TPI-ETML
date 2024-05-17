FROM python:3.12.3

WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev

COPY . .
RUN pip install -r requirements.txt

ENV FRONTEND_URL=http://localhost:3000

EXPOSE 5000
CMD ["python", "run.py"]