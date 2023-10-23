import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from './quiz-answer.entity';
import { StudentModule } from 'src/student/student.module';
import { QuizAnswerResolver } from './quiz-answer.resolver';
import { AnswerQuizService } from './quiz-answer.service';
import { AnswerQuizController } from './quiz-answer.controller';
import { QuestionModule } from 'src/question/question.module';
import { StudentAnswerModule } from 'src/student-answer/answer-student.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAnswer]),
        StudentModule,
        QuestionModule,
        StudentAnswerModule
    ],
    controllers: [AnswerQuizController],
    providers: [QuizAnswerResolver, AnswerQuizService],
    exports: [AnswerQuizService]
})
export class QuizAnswerModule {}
