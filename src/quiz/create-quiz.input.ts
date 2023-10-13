import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";


@InputType()
export class CreateQuizInput {

    @MinLength(1)
    @Field()
    name: string

    @Field()
    teacherId: string

    // @IsUUID("4", { each: true })
    // @Field(type => [ID], { defaultValue: [] })
    @Field(() => [ID], { defaultValue: [] })
    questions: string[]

    // TODO: implement assigned students
}
