import { Field, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"
import { CreateStudentAnswerInput } from "src/student-answer/answer-student.input"

@InputType()
export class QuizAnswerInput {
    
    @Field()
    @IsUUID()
    quizId: string

    @Field()
    @IsUUID()
    studentId: string
    
    @Field(type => [CreateStudentAnswerInput])
    answers: CreateStudentAnswerInput[]
}