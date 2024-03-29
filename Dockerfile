FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma migrate dev --name init
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]
