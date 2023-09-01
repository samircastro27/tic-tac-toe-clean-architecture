FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json *-lock.(json|yaml) /app/
RUN corepack enable pnpm && \
    pnpm install --silent

COPY . ./

RUN pnpx vite build

FROM nginx:1.25-alpine3.18

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]