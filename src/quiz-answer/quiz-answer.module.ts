import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from '../model/quiz-answer.entity';
import { StudentModule } from 'src/student/student.module';
import { QuizAnswerResolver } from './quiz-answer.resolver';
import { AnswerQuizService } from './quiz-answer.service';
import { AnswerQuizController } from './quiz-answer.controller';
import { QuestionModule } from 'src/question/question.module';
import { StudentAnswerModule } from 'src/answer-student/answer-student.module';
import { TeacherAnswerModule } from 'src/answer-teacher/answer-teacher.module';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAnswer]),
        StudentModule,
        QuizModule,
        QuestionModule,
        StudentAnswerModule,
        TeacherAnswerModule
    ],
    controllers: [AnswerQuizController],
    providers: [QuizAnswerResolver, AnswerQuizService],
    exports: [AnswerQuizService]
})
export class QuizAnswerModule {}
