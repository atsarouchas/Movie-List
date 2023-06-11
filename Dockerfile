FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG MOVIE_DB_API_KEY

ENV MOVIE_DB_API_KEY=$MOVIE_DB_API_KEY

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]