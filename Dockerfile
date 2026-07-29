# --- Etapa de Compilación y Frontend ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

// --- Etapa Final de Ejecución ---
FROM node:18-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/backend ./backend

EXPOSE 8080

CMD ["node", "backend/server.js"]
