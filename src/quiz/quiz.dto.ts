import { ID } from 'graphql-ws';
import { QuestionDto } from 'src/question/question.dto';
import { StudentDto } from 'src/student/student.dto';

export class QuizDto {

    id: ID

    name: string

    teacher: StudentDto

    questions: QuestionDto[]
}