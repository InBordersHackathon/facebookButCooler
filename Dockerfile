FROM node:14-alpine

RUN apk add git

RUN git clone --branch dev https://github.com/InBordersHackathon/facebookButCooler.git
WORKDIR facebookButCooler/example-app
RUN npm i
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
