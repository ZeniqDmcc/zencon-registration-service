FROM node:16.15-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9003
CMD ["npm", "start"]
