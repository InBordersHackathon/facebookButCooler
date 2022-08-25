FROM node:14-alpine

RUN apk add git

RUN git clone --branch dev https://github.com/InBordersHackathon/facebookButCooler.git

WORKDIR facebookButCooler/example-backend

RUN npm i

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start"]