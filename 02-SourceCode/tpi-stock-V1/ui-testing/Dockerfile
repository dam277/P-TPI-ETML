FROM cypress/included:13.9.0

WORKDIR /app

COPY . .
RUN npm install

ENV REACT_APP_BACKEND_URL=http://localhost:5000
ENV REACT_APP_FRONTEND_URL=http://localhost:3000