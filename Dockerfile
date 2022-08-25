FROM node:12-alpine

RUN apk add git

RUN git clone --branch dev https://github.com/InBordersHackathon/facebookButCooler.git
RUN cd facebookButCooler/mock-ui
RUN npm i
RUN npm run dev

EXPOSE 5173