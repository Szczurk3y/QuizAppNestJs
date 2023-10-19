import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@ObjectType('Question')
export class QuestionType {

    @Field(type => ID)
    id: string

    @Field()
    question: string

    @Field()
    answer: string

    @Field()
    quizId: string
}