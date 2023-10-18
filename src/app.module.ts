import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './quiz/quiz.entity';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/answer.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'mongo',
      database: 'quizapp',
      synchronize: true,
      logging: true,
      useUnifiedTopology: true,
      entities: [
        Student,
        Quiz,
        Question,
        Answer
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    StudentModule,
    QuizModule,
    QuestionModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
