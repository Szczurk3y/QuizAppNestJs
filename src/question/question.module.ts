import { Module, forwardRef } from '@nestjs/common';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Question]),
        forwardRef(() => QuizModule)
    ],
    providers: [QuestionResolver, QuestionService],
    exports: [QuestionService]

})
export class QuestionModule {}
