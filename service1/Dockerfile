FROM node:22-bullseye-slim

WORKDIR /app

COPY ../instrumentation /app/instrumentation

COPY ../service1 /app/service1

WORKDIR /app/service1
RUN npm install
EXPOSE 5001

CMD ["npm", "run", "start"]