FROM node:20.9.0

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build
RUN npx prisma generate
RUN npx prisma db push --accept-data-loss

EXPOSE 8080

CMD [ "npm", "run", "start" ]
