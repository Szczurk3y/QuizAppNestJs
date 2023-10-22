import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('Answer')
export class AnswerType {

    @Field(type => ID)
    id: string

    @Field()
    answer: string

    @Field()
    isCorrect: boolean

    @Field()
    questionId: string
}