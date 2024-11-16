# task-service/Dockerfile
FROM node:18.18.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002
CMD ["npm", "run", "start"]
