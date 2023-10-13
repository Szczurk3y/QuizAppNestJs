import { Module } from '@nestjs/common';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    providers: [QuestionResolver, QuestionService],
    exports: [QuestionService]

})
export class QuestionModule {}
