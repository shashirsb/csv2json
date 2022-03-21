FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .
COPY * /usr/src/app/

# Install all Packages
RUN npm install --save
RUN npm install -g typescript --save
RUN npm install -g ts-node --save
RUN npm install -g npm@8.5.5
RUN npm install -g --save typescript @types/node 

# Copy all other source code to work directory
ADD . /usr/src/app
RUN tsc
# TypeScript
# RUN npm run tsc

# Start
CMD [ "npm", "start" ]
EXPOSE 7001
