import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { TeacherAnswerType } from "src/teacher-answer/answer-teacher.type";

export enum QuestionAnswerType {
    SINGLE_CORRECT_ANSWER = "single_correct_answer",
    MULTIPLE_CORRECT_ANSWERS = "multiple_correct_answers",
    SORTING = "sorting",
    PLAIN_TEXT_ANSWER = "plain_text_answer"
}

registerEnumType(QuestionAnswerType, { name: 'QuestionType'})

@ObjectType('Question')
export class QuestionType {

    @Field(type => ID)
    id: string

    @Field()
    quizId: string

    @Field()
    question: string

    @Field(type => QuestionAnswerType)
    type: QuestionAnswerType

    @Field(type => [TeacherAnswerType])
    answers: string[]
}