import { Module, forwardRef } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';
import { QuestionModule } from 'src/question/question.module';
import { StudentModule } from 'src/student/student.module';
import { StudentAnswer } from 'src/student-answer/answer-student.entity';
import { QuizController } from './quiz.controller';
import { TeacherAnswerModule } from 'src/teacher-answer/answer-teacher.module';

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
