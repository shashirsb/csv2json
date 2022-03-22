

FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN ls -a
RUN npm update
RUN npm install -g --production
RUN npm install -g --production typescript
RUN npm install -g --production @types/node
RUN npm install  pm2 -g --production
RUN tsc
COPY ./dist ./

## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install --production
RUN npm install -g @types/node --production
RUN tsc

COPY --from=0 /usr/app/dist .
EXPOSE 80
CMD ["npm","app.js"]

