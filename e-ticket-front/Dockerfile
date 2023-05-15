FROM node:16.13.0

WORKDIR /front

COPY package.json ./
COPY package-lock.json ./

COPY . ./

RUN npm install

RUN npm install react-scripts@3.4.1 -g --silent

CMD ["npm", "run", "start"]