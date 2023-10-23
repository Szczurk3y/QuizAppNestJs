import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAnswer } from './quiz-answer.entity';
import { StudentModule } from 'src/student/student.module';
import { QuizAnswerResolver } from './quiz-answer.resolver';
import { QuizAnswerService } from './quiz-answer.service';
import { TeacherAnswerModule } from 'src/teacher-answer/answer-teacher.module';
import { StudentAnswer } from 'src/student-answer/answer-student.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([QuizAnswer, StudentAnswer]),
        StudentModule,
        TeacherAnswerModule
    ],
    providers: [QuizAnswerResolver, QuizAnswerService],
    exports: [QuizAnswerService]
})
export class QuizAnswerModule {}
