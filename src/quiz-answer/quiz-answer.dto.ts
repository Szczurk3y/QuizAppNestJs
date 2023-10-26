import { ID } from 'graphql-ws';
import { StudentAnswerDto } from 'src/answer-student/answer-student.dto';
import { StudentDto } from 'src/student/student.dto';

export class QuizAnswerDto {
    
    id: ID

    quizName: string

    student: StudentDto
    
    studentAnswers: StudentAnswerDto[]
}