import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { CreateAnswerInput } from "src/answer/answer.input";
import { QuestionAnswerType } from "./question.type";

@InputType()
export class CreateQuestionInput {

    @MinLength(1)
    @Field()
    question: string

    @Field({ defaultValue: "" })
    quizId: string

    @Field(type => QuestionAnswerType)
    type: QuestionAnswerType

    @Field(() => [CreateAnswerInput])
    @IsNotEmpty()
    answers: CreateAnswerInput[]
}