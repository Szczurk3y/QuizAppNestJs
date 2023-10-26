import { QuestionAnswerType } from "src/question/question.type";
import { ID } from 'graphql-ws';

export class StudentAnswerDto {

    questionId: ID

    question: string

    questionType: QuestionAnswerType

    studentAnswer: string
    
    isCorrect: boolean
}