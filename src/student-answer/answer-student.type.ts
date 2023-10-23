import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql";
import { Column } from "typeorm";
import { ID } from 'graphql-ws';


@ObjectType('StudentAnswer')
export class StudentAnswerType {

    @Field(type => FieldID)
    id: ID

    @Column()
    studentId: ID

    @Field()
    questionId: ID

    @Field(type => [String])
    studentAnswers: String[]
}