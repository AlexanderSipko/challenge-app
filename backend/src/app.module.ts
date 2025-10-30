import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config'; // Убираем
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AppConfigService } from './config/config.service'; // Убираем

@Module({
  imports: [
    // ConfigModule.forRoot({ // Убираем
    //   envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    //   isGlobal: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService], // Только AppService, без AppConfigService
})
export class AppModule {}