import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql"
import { StudentAnswerType } from "src/student-answer/answer-student.type"
import { ID } from 'graphql-ws';


@ObjectType('QuizAnswer')
export class QuizAnswerType {

    @Field(type => FieldID)
    id: ID

    @Field(type => FieldID)
    quizId: ID

    @Field(type => FieldID)
    studentId: ID

    @Field(type => [StudentAnswerType])
    studentAnswerIds: ID[]
}