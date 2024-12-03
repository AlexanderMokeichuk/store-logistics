FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

RUN npm install -g typescript ts-node prisma

CMD ["wait-for-it", "history-db:5432", "--", "npx", "prisma", "migrate", "deploy"]


