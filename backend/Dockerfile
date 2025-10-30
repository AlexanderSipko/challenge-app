FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build  # ← Сборка при создании образа
EXPOSE 3001
CMD ["npm", "run", "start:prod"]  # ← Запуск сервера