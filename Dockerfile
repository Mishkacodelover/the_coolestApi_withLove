FROM node:20

WORKDIR the_coolestapi_withlove/app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]








