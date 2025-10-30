import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Challenge } from './interfaces/challenge.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/health')
  getHealth(): object {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'challenge-backend' 
    };
  }

  // GET все челленджи
  @Get('api/challenges')
  getChallenges(): Challenge[] {
    return this.appService.getChallenges();
  }

  // GET один челлендж
  @Get('api/challenges/:id')
  getChallenge(@Param('id', ParseIntPipe) id: number): Challenge {
    return this.appService.getChallenge(id);
  }

  // CREATE новый челлендж
  @Post('api/challenges')
  createChallenge(@Body() body: Omit<Challenge, 'id' | 'createdAt'>): Challenge {
    return this.appService.createChallenge(body);
  }

  // UPDATE челлендж
  @Put('api/challenges/:id')
  updateChallenge(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Challenge>
  ): Challenge {
    return this.appService.updateChallenge(id, body);
  }

  // DELETE челлендж
  @Delete('api/challenges/:id')
  deleteChallenge(@Param('id', ParseIntPipe) id: number): void {
    return this.appService.deleteChallenge(id);
  }

  // JOIN к челленджу
  @Post('api/challenges/:id/join')
  joinChallenge(@Param('id', ParseIntPipe) id: number): Challenge {
    return this.appService.joinChallenge(id);
  }
}