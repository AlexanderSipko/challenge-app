import { Injectable, NotFoundException } from '@nestjs/common';
import { Challenge } from './interfaces/challenge.interface';
// import { AppConfigService } from './config/config.service'; // УБЕРИТЕ ЭТУ СТРОКУ

@Injectable()
export class AppService {
  // constructor(private configService: AppConfigService) {} // УБЕРИТЕ ЭТУ СТРОКУ

  private challenges: Challenge[] = [
    {
      id: 1,
      title: '30 дней спорта',
      description: 'Ежедневные тренировки в течение месяца',
      participants: 45,
      createdAt: new Date()
    },
    {
      id: 2, 
      title: 'Чтение книг',
      description: 'Прочитать 10 книг за 2 месяца',
      participants: 23,
      createdAt: new Date()
    }
  ];

  private nextId = 3;

  getHello(): string {
    return 'Hello from Challenge App Backend!';
  }

  // GET все челленджи
  getChallenges(): Challenge[] {
    return this.challenges;
  }

  // GET один челлендж
  getChallenge(id: number): Challenge {
    const challenge = this.challenges.find(c => c.id === id);
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  // CREATE новый челлендж
  createChallenge(challengeData: Omit<Challenge, 'id' | 'createdAt'>): Challenge {
    const newChallenge: Challenge = {
      id: this.nextId++,
      ...challengeData,
      createdAt: new Date()
    };
    this.challenges.push(newChallenge);
    return newChallenge;
  }

  // UPDATE челлендж
  updateChallenge(id: number, updateData: Partial<Challenge>): Challenge {
    const challengeIndex = this.challenges.findIndex(c => c.id === id);
    if (challengeIndex === -1) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }

    this.challenges[challengeIndex] = {
      ...this.challenges[challengeIndex],
      ...updateData
    };

    return this.challenges[challengeIndex];
  }

  // DELETE челлендж
  deleteChallenge(id: number): void {
    const challengeIndex = this.challenges.findIndex(c => c.id === id);
    if (challengeIndex === -1) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    this.challenges.splice(challengeIndex, 1);
  }

  // JOIN к челленджу (увеличиваем счетчик участников)
  joinChallenge(id: number): Challenge {
    const challenge = this.getChallenge(id);
    challenge.participants += 1;
    return challenge;
  }
}