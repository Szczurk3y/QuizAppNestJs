import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Quiz')
export class QuizType {

    @Field(type => ID)
    id: string

    @Field()
    name: string

    @Field()
    teacherId: string

    // TODO: replace String with QuestionType
    @Field(type => [String])
    questions: string[]
}