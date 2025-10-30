# Используем образ с docker-compose
FROM docker:latest

# Устанавливаем зависимости
RUN apk add --no-cache \
    python3 \
    py3-pip \
    nodejs \
    npm

# Устанавливаем docker-compose
RUN pip3 install docker-compose

# Копируем весь проект
COPY . /app
WORKDIR /app

# Запускаем docker-compose
CMD ["docker-compose.render", "up"]