FROM python:3.12.3

WORKDIR /app

COPY . .
RUN pip3 install -r requirements.txt

# Copy the React build from client container
COPY --from=02-sourcecode-client /app/build ./build

EXPOSE 5000
CMD [ "python3", "app.py"]