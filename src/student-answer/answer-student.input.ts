import { Field, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"
import { ID } from 'graphql-ws';

@InputType("StudentsAnswerInput")
export class CreateStudentAnswerInput {

    @Field()
    @IsUUID()
    questionId: ID

    @Field({ defaultValue: "" })
    @IsUUID("4", { each: true })
    singleCorrectAnswerId: ID = ""

    @Field(type => [String], { defaultValue: [] })
    @IsUUID("4", { each: true })
    multipleCorrectAnswerIds: ID[] = []

    @Field(type => [String], { defaultValue: [] })
    @IsUUID("4", { each: true })
    sortedAnswerIds: ID[] = []

    @Field({ defaultValue: ""})
    plainTextAnswer: string = ""
}