import { Field, ID, ObjectType } from "@nestjs/graphql"
import { StudentAnswer } from "src/student-answer/answer-student.entity"
import { StudentAnswerType } from "src/student-answer/answer-student.type"


@ObjectType('QuizAnswer')
export class QuizAnswerType {

    @Field(type => ID)
    id: string

    @Field(type => ID)
    quizId: string

    @Field(type => ID)
    studentId: string

    @Field(type => [StudentAnswerType])
    answers: StudentAnswerType[]
}