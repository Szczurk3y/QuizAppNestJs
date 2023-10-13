import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateQuestionInput {

    @MinLength(1)
    @Field()
    question: string

    // TODO: @IsUUID("4", { each: true })
    @Field(() => [ID], { defaultValue: [] })
    answers: string[]

}