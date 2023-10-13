import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType('Teacher')
export class TeacherType {
    
    @Field(type => ID)
    id: string

    @Field()
    firstName: string

    @Field()
    lastName: string
}