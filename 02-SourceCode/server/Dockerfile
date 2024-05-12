FROM python:3.12.3

WORKDIR /app

COPY . .
RUN pip3 install -r requirements.txt

ENV FRONTEND_ULR=http://localhost:3000

EXPOSE 5000
CMD [ "python3", "app.py"]