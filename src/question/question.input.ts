import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { CreateAnswerTeacherInput } from "src/teacher-answer/answer-teacher.input";
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

    @Field(() => [CreateAnswerTeacherInput])
    @IsNotEmpty()
    answers: CreateAnswerTeacherInput[]
}