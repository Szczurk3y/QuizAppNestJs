import { Module } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz])
        // TODO: import question module later
    ],
    providers: [QuizResolver, QuizService],
    exports: [QuizService]
    
})
export class QuizModule {}
