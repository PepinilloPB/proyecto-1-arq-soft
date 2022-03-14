FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install 

RUN npm install typescript

COPY  . .

RUN npm run build

EXPOSE 3000

CMD npm run dev
