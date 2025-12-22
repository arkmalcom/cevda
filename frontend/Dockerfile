FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf
