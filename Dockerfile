FROM node:dubnium-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --ignore-optional \
 && yarn compile

FROM node:dubnium-alpine

WORKDIR /usr/src/app

COPY --from=0 \
/usr/src/app/.env \
/usr/src/app/package.json \
/usr/src/app/yarn.lock \
/usr/src/app/build/. \
./

RUN yarn install --ignore-optional --prod

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "server.js"]
