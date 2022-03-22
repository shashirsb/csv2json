FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN ls -a
RUN npm update
RUN npm install -g
RUN npm install -g typescript
RUN npm install -g @types/node
RUN npm install  pm2 -g
RUN tsc
COPY ./dist ./
RUN ls -ltr
RUN ls -ltr ./
RUN ls -ltr /usr/app

## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/app/dist .
RUN tsc
EXPOSE 80
CMD ["npm","app.js"]

