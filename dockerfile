FROM node:alpine

WORKDIR /home/node/app

COPY package.json ./
RUN npm install 
RUN npm run deploy

COPY . . 

EXPOSE 8080

CMD ["npm", "start"]



