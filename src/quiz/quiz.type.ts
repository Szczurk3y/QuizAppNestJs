import { Field, ID, ObjectType } from "@nestjs/graphql";
import { QuestionType } from "src/question/question.type";
import { StudentType } from "src/student/student.type";

@ObjectType('Quiz')
export class QuizType {

    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field(type => StudentType)
    teacher: string

    @Field(type => [QuestionType])
    questions: QuestionType[]

    @Field(type => [StudentType])
    students: string[]
}