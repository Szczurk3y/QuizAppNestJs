import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from './quiz-answer.entity';
import { StudentModule } from 'src/student/student.module';
import { QuizAnswerResolver } from './quiz-answer.resolver';
import { AnswerQuizService } from './quiz-answer.service';
import { TeacherAnswerModule } from 'src/teacher-answer/answer-teacher.module';
import { StudentAnswer } from 'src/student-answer/answer-student.entity';
import { AnswerQuizController } from './quiz-answer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAnswer, StudentAnswer]),
        StudentModule,
        TeacherAnswerModule
    ],
    controllers: [AnswerQuizController],
    providers: [QuizAnswerResolver, AnswerQuizService],
    exports: [AnswerQuizService]
})
export class QuizAnswerModule {}
