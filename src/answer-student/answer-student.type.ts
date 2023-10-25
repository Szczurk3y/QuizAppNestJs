import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql";
import { ID } from 'graphql-ws';
import { QuestionAnswerType } from "src/question/question.type";


@ObjectType('StudentAnswer')
export class StudentAnswerType {

    @Field(type => FieldID)
    id: ID

    @Field(type => FieldID)
    questionId: ID

    @Field()
    question: string

    @Field()
    questionType: QuestionAnswerType

    @Field()
    studentAnswer: string
    
    @Field()
    isCorrect: boolean
}