FROM node:19.0.0-alpine

WORKDIR /auth-back

COPY package*.json ./
RUN npm install --silent

CMD ["npm", "run", "start"]