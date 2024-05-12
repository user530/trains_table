# Build stage
FROM node:current-alpine3.19 AS build

WORKDIR /builder

COPY package*.json .

RUN npm i

COPY . .

ARG DATA_URL

ENV REACT_APP_TRAINS_URL=${DATA_URL}

RUN npm run build

# Clean up node modules
RUN npm ci --only=production && npm cache clean --force

# Production
FROM nginx

WORKDIR /app

COPY --from=build /builder/build ./dist

CMD [ "/bin/sh", "-c", "sh", "echo", "'Build copied'" ]