import { Field, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"
import { ID } from 'graphql-ws';

@InputType("StudentsAnswerInput")
export class CreateStudentAnswerInput {

    @Field()
    @IsUUID()
    questionId: ID

    @Field(type => [String], { defaultValue: [] })
    studentAnswerIds: ID[] = []

    @Field({ defaultValue: ""})
    plainTextAnswer: string = ""
}