import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CreateQuestionInput } from "src/question/question.input";
import { QuestionType } from "src/question/question.type";

@ObjectType('Quiz')
export class QuizType {

    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    teacherId: string

    @Field(type => [QuestionType])
    questions: QuestionType[]
}