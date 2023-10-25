import { Field, ID as FieldID, ObjectType } from "@nestjs/graphql";
import { QuestionType } from "src/question/question.type";
import { StudentType } from "src/student/student.type";
import { ID } from 'graphql-ws';
import { StudentDto } from "src/student/student.dto";
import { QuestionDto } from "src/question/question.dto";

@ObjectType('Quiz')
export class QuizDtoType {

    @Field(type => FieldID)
    id: ID

    @Field()
    name: string

    @Field(type => StudentType)
    teacher: StudentDto

    @Field(type => [QuestionType])
    questions: QuestionDto[]
}