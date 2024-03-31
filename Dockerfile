FROM node:20.9.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma db push --accept-data-loss

EXPOSE 8080

CMD [ "npm run start" ]
