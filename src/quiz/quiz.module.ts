import { Module, forwardRef } from '@nestjs/common';
import { Quiz } from '../model/quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { QuestionModule } from 'src/question/question.module';
import { StudentModule } from 'src/student/student.module';
import { StudentAnswer } from 'src/model/answer-student.entity';
import { QuizController } from './quiz.controller';
import { TeacherAnswerModule } from 'src/answer-teacher/answer-teacher.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz, StudentAnswer]),
        forwardRef(() => QuestionModule),
        StudentModule,
        TeacherAnswerModule
    ],
    controllers: [QuizController],
    providers: [QuizResolver, QuizService],
    exports: [QuizService]
    
})
export class QuizModule {}
