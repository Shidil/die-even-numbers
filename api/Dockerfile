FROM node:14-slim


COPY ./api/. /work/api
COPY ./shared/. /work/shared
COPY ./package.json /work/package.json
COPY ./package-lock.json /work/package-lock.json

WORKDIR /work

ENV PORT=80
ENV NODE_ENV=production

RUN npm install

ENTRYPOINT [ "node", "./api/server.js"]