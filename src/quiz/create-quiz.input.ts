import { Field, ID, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";


@InputType()
export class CreateQuizInput {

    @MinLength(1)
    @Field()
    name: string

    @Field()
    teacherId: string

    // TODO: @IsUUID("4", { each: true })
    @Field(() => [ID], { defaultValue: [] })
    questions: string[]

    // TODO: implement assigned students
}
