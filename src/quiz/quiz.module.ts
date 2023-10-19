import { Module, forwardRef } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { QuestionModule } from 'src/question/question.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz]),
        forwardRef(() => QuestionModule)
    ],
    providers: [QuizResolver, QuizService],
    exports: [QuizService]
    
})
export class QuizModule {}
