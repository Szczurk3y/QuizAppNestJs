import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('StudentAnswer')
export class StudentAnswerType {

    @Field(type => ID)
    id: string

    @Field()
    answer: string

    @Field()
    questionId: string
}