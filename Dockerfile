FROM node:18-alpine as development
WORKDIR /app
COPY *.json yarn.lock ./
RUN yarn install -s
COPY src ./
VOLUME src ./src
CMD [ "yarn", "run", "start:dev" ]