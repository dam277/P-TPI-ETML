FROM node:19.5.0-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm run css:build

ENV REACT_APP_BACKEND_URL=http://localhost:5000

EXPOSE 3000
CMD [ "npm", "start" ]