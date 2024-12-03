FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript ts-node prisma

RUN tsc

EXPOSE 3001

CMD ["npm", "run", "dev"]

