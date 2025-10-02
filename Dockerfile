FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Usar variável de ambiente para a porta
EXPOSE ${PORT:-3000}

CMD ["npm", "run", "start:prod"]