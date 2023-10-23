import { Field, InputType } from "@nestjs/graphql"
import { IsUUID, MinLength } from "class-validator"

@InputType("StudentAnswerInput")
export class CreateStudentAnswerInput {

    @MinLength(1)
    @Field()
    answer: string

    @Field()
    @IsUUID()
    questionId: string
}