FROM node:14-alpine3.10 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm update
RUN npm install -save
RUN npm install --save-dev @types/node
COPY . ./
RUN tsc


# FROM node:14-alpine3.10 as ts-remover
# WORKDIR /usr/app
# COPY --from=ts-compiler /usr/app/package*.json ./
# COPY --from=ts-compiler /usr/app/dist ./
# RUN ls -ltr
# RUN ls -ltr ./
# RUN ls -ltr /usr/app
# RUN npm install --only=production


# FROM gcr.io/distroless/nodejs:14
# WORKDIR /usr/app
# COPY --from=ts-remover /usr/app ./
# USER 1000
CMD ["npm", " start"]
EXPOSE 7001

