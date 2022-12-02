FROM node:16
WORKDIR /node-docker
EXPOSE 3333
COPY . .
RUN npm install .
ENTRYPOINT npm start
