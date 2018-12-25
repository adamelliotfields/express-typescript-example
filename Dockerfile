FROM node:dubnium-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn install --ignore-optional --production=false \
 && yarn compile

FROM node:dubnium-alpine

WORKDIR /usr/src/app

COPY --from=0 \
/usr/src/app/build/. \
/usr/src/app/package.json \
/usr/src/app/yarn.lock \
./

RUN yarn install --ignore-optional --production=true

EXPOSE 3000

CMD ["node", "server.js"]
