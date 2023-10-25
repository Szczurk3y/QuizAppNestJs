import { Module, forwardRef } from '@nestjs/common';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuizModule } from 'src/quiz/quiz.module';
import { TeacherAnswerModule } from 'src/answer-teacher/answer-teacher.module';
import { QuestionResolver } from './question.resolver';

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
