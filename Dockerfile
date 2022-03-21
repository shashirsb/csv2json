FROM node:lts-alpine
ENV NODE_ENV=production

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app\
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install -g ts-node
USER node
RUN npm install --production

COPY --from=builder /home/node/app/build ./build
COPY --chown=node:node .env .
COPY --chown=node:node  /config ./config
COPY --chown=node:node  /public ./public
EXPOSE 8090
CMD [ "node", "build/server.js" ]