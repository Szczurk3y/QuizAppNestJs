import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateTeacherAnswerInput {

    @MinLength(1)
    @Field()
    answer: string

    @Field({ defaultValue: false })
    isCorrect: boolean

    @Field({ defaultValue: "" })
    questionId: string
}