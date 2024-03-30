FROM node:20

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]
