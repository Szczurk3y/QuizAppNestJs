import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID, MinLength } from "class-validator";
import { CreateQuestionInput } from "src/question/question.input";
import { QuestionType } from "src/question/question.type";


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
}
