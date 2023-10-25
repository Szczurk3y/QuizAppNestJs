import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql"
import { ID } from 'graphql-ws';
import { StudentAnswerDto } from "src/answer-student/answer-student.dto";
import { StudentAnswerType } from "src/answer-student/answer-student.type";
import { StudentDto } from "src/student/student.dto";
import { StudentType } from "src/student/student.type";


@ObjectType('QuizAnswer')
export class QuizAnswerType {

    @Field(type => FieldID)
    id: ID

    @Field()
    quizName: string

    @Field(type => StudentType)
    student: StudentDto

    @Field(type => [StudentAnswerType])
    studentAnswers: StudentAnswerDto[]
}