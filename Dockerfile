FROM node:18-alpine as development
WORKDIR /app
COPY *.json yarn.lock ./
RUN yarn install -s
COPY ./ ./
VOLUME ./src ./src
CMD [ "yarn", "run", "start:dev" ]

FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN yarn -s

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn run build

FROM node:lts-alpine as running
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/*.json ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE ${API_PORT}
CMD [ "yarn", "run", "start:dev" ]