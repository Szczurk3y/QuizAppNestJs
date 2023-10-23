import { Field, ID as TypeID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { TeacherAnswerType } from "src/teacher-answer/answer-teacher.type";
import { ID } from 'graphql-ws';

export enum QuestionAnswerType {
    SINGLE_CORRECT_ANSWER = "single_correct_answer",
    MULTIPLE_CORRECT_ANSWERS = "multiple_correct_answers",
    SORTING = "sorting",
    PLAIN_TEXT_ANSWER = "plain_text_answer"
}

registerEnumType(QuestionAnswerType, { name: 'QuestionAnswerType'})

@ObjectType('Question')
export class QuestionType {

    @Field(type => TypeID)
    id: ID

    @Field()
    quizId: ID

    @Field()
    question: string

    @Field(type => QuestionAnswerType)
    type: QuestionAnswerType

    @Field(type => [TeacherAnswerType])
    answerIds: ID[]
}