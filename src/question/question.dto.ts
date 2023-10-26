import { TeacherAnswerDto } from "src/answer-teacher/answer-teacher.dto";
import { QuestionAnswerType } from "./question.type"
import { ID } from 'graphql-ws';

export class QuestionDto {

    id: ID
    question: string
    type: QuestionAnswerType
    answers: TeacherAnswerDto[]
}