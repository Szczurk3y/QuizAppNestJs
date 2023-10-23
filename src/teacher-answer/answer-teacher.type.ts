import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('TeacherAnswer')
export class TeacherAnswerType {

    @Field(type => ID)
    id: string

    @Field()
    answer: string

    @Field()
    isCorrect: boolean

    @Field()
    questionId: string
}