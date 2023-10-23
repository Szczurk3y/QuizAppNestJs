import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, MinLength } from "class-validator";
import { CreateQuestionInput } from "src/question/question.input";
import { ID } from 'graphql-ws';

@InputType()
export class CreateQuizInput {

    @MinLength(1)
    @Field()
    name: string

    @Field()
    @IsUUID()
    teacherId: ID

    @Field(() => [CreateQuestionInput])
    questions: CreateQuestionInput[]

    @IsUUID("4", { each: true })
    @Field(() => [String])
    studentIds: ID[]
}
