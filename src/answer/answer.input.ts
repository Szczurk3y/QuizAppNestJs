import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, MinLength } from "class-validator";

@InputType()
export class CreateAnswerInput {

    @MinLength(1)
    @Field()
    answer: string

    @Field({ defaultValue: false })
    isCorrect: boolean

    @Field({ defaultValue: "" })
    questionId: string
}