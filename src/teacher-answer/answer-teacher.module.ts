import { Module } from '@nestjs/common';
import { TeacherAnswer } from './answer-teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAnswerService as TeacherAnswerService } from './answer-teacher.service';
import { TeacherAnswerResolver as TeacherAnswerResolver } from './answer-teacher.resolver';
import { TeacherAnswerController } from './answer-teacher.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherAnswer])],
    controllers: [TeacherAnswerController],
    providers: [TeacherAnswerResolver, TeacherAnswerService],
    exports: [TeacherAnswerService]
})
export class TeacherAnswerModule {}
