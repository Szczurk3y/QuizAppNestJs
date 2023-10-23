import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql";
import { QuestionType } from "src/question/question.type";
import { StudentType } from "src/student/student.type";
import { ID } from 'graphql-ws';

@ObjectType('Quiz')
export class QuizType {

    @Field(type => FieldID)
    id: ID

    @Field()
    name: string

    @Field(type => StudentType)
    teacherId: ID

    @Field(type => [QuestionType])
    questionIds: ID[]

    @Field(type => [StudentType])
    studentIds: ID[]
}