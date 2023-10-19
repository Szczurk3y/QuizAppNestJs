import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID, MinLength } from "class-validator";

@InputType()
export class CreateQuestionInput {

    @MinLength(1)
    @Field()
    question: string

    @Field(() => ID)
    answer: string

    @Field({ defaultValue: "" })
    quizId: string
}