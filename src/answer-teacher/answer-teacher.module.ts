import { Module } from '@nestjs/common';
import { TeacherAnswer } from '../model/answer-teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherAnswerService as TeacherAnswerService } from './answer-teacher.service';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherAnswer])],
    providers: [TeacherAnswerService],
    exports: [TeacherAnswerService]
})
export class TeacherAnswerModule {}
