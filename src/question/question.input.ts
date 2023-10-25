import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";
import { CreateTeacherAnswerInput } from "src/answer-teacher/answer-teacher.input";
import { QuestionAnswerType } from "./question.type";
import { ID } from 'graphql-ws';

@InputType()
export class CreateQuestionInput {

    @MinLength(1)
    @Field()
    question: string

    @Field({ defaultValue: "" })
    quizId: ID

    @Field(type => QuestionAnswerType)
    type: QuestionAnswerType

    @Field(() => [CreateTeacherAnswerInput])
    @IsNotEmpty()
    answers: CreateTeacherAnswerInput[]
}