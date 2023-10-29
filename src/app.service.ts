import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  quizAppWorkingAffirmation(): string {
    return 'Quiz App Works, visit: \nhttp://localhost:3001/graphql and/or http://localhost:8080/adminer postgres:postgres';
  }
}
