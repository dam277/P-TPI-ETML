# BUILD REACT -
FROM node:19.5.0-alpine as build

# Set the working directory in the container to /app
WORKDIR /app/client
COPY ./client .

# Install any needed packages
RUN npm install
RUN npm run build

# BUILD FLASK -
FROM python:3.12.3

# Move all files to the /app directory
WORKDIR /app
COPY . .
COPY --from=build /app/client/build /app/server/frontend

# Install python and sqlite3 and create a virtual environment
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev
RUN pip install -r requirements.txt

# Run the app
EXPOSE 5000
CMD ["python", "run.py"]