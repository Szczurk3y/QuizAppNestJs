import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql";
import { ID } from 'graphql-ws';

@ObjectType('TeacherAnswer')
export class TeacherAnswerType {

    @Field(type => FieldID)
    id: ID

    @Field()
    answer: string

    @Field()
    isCorrect: boolean

    @Field()
    questionId: string
}