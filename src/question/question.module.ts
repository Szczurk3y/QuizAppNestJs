import { Module, forwardRef } from '@nestjs/common';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuizModule } from 'src/quiz/quiz.module';
import { TeacherAnswerModule } from 'src/teacher-answer/answer-teacher.module';
import { QuestionController } from './question.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        forwardRef(() => QuizModule),
        TeacherAnswerModule
    ],
    controllers: [QuestionController],
    providers: [QuestionResolver, QuestionService],
    exports: [QuestionService]

})
export class QuestionModule {}
