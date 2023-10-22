import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, MinLength } from "class-validator";
import { CreateQuestionInput } from "src/question/question.input";

@InputType()
export class CreateQuizInput {

    @MinLength(1)
    @Field()
    name: string

    @Field()
    @IsUUID()
    teacherId: string

    @Field(() => [CreateQuestionInput])
    questions: CreateQuestionInput[]

    @IsUUID("4", { each: true })
    @Field(() => [String])
    studentIds: string[]
}
