import { Field, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"
import { CreateStudentAnswerInput } from "src/answer-student/answer-student.input"
import { ID } from 'graphql-ws';

@InputType()
export class QuizAnswerInput {
    
    @Field()
    @IsUUID()
    quizId: ID

    @Field()
    @IsUUID()
    studentId: ID
    
    @Field(type => [CreateStudentAnswerInput])
    answers: CreateStudentAnswerInput[]
}