FROM node:lts-alpine as development
RUN npm i -g pnpm
WORKDIR /app
COPY package.json ./
RUN pnpm install
COPY ./ ./
VOLUME ./src ./src
CMD [ "pnpm", "start:dev" ]

# FROM node:lts-alpine as dependencies
# RUN npm i -g pnpm
# WORKDIR /app
# COPY package.json ./
# RUN pnpm install

# FROM node:lts-alpine as builder
# RUN npm i -g pnpm
# WORKDIR /app
# COPY ./*.json ./.env ./src ./
# COPY --from=dependencies /app/node_modules ./node_modules
# RUN pnpm build

# FROM node:lts-alpine as running
# RUN npm i -g pnpm
# WORKDIR /app
# ENV NODE_ENV dev
# COPY --from=builder /app/*.json ./
# COPY --from=builder /app/.env ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# EXPOSE ${API_PORT}
# CMD [ "pnpm", "start:dev" ]