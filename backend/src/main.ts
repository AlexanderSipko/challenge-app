import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
// import { ConfigService } from '@nestjs/config'; // Убираем эту строку
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService); // Убираем эту строку
  
  // Используем переменные окружения напрямую
  const port = process.env.PORT || 3001;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  
  // Включаем CORS для фронтенда
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });
  
  await app.listen(port);
  console.log(`🚀 Backend running on port ${port}`);
  console.log(`🌐 CORS enabled for: ${frontendUrl}`);
}
bootstrap();