FROM node:20-alpine

RUN apk add --no-cache python3 make g++ \
    && corepack enable \
    && corepack prepare pnpm@9 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --unsafe-perm

COPY src ./src

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

CMD ["node", "src/servidor.js"]