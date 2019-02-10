FROM node:10.15.1
WORKDIR /var/app
COPY . .
RUN npm install
