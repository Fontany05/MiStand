FROM node:20.19-alpine

RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["sh", "entrypoint.sh"]