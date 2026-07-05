FROM node:20-alpine AS build

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app/frontend

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ ./

ARG VITE_API_BASE=/api
ENV VITE_API_BASE=$VITE_API_BASE

RUN pnpm build

FROM nginx:alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY server/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]