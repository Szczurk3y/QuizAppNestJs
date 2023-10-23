import { Module, forwardRef } from '@nestjs/common';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuizModule } from 'src/quiz/quiz.module';
import { TeacherAnswerModule } from 'src/teacher-answer/answer-teacher.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        forwardRef(() => QuizModule),
        TeacherAnswerModule
    ],
    providers: [QuestionResolver, QuestionService],
    exports: [QuestionService]

})
export class QuestionModule {}
