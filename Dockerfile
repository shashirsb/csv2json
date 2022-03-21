FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
RUN npm install -g typescript
RUN npm install -g ts-node

# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN npm run tsc

# Start
CMD [ "npm", "start" ]
EXPOSE 7001
