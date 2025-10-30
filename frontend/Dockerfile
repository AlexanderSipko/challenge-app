FROM node:20-alpine
# Получаем переменные на этапе сборки
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # ← Теперь переменная доступна при сборке

EXPOSE 3000

CMD ["npm", "start"]