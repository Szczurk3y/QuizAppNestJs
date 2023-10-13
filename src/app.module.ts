import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/teacher.entity';
import { QuizModule } from './quiz/quiz.module';
import { Quiz } from './quiz/quiz.entity';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/quizapp',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Teacher,
        Quiz,
        Question
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TeacherModule,
    QuizModule,
    QuestionModule,
  ],
})
export class AppModule {}
