import { Module } from '@nestjs/common';
import { Answer } from './answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    providers: [AnswerResolver, AnswerService],
    exports: [AnswerService]
})
export class AnswerModule {}
