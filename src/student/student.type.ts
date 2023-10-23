import { Field, ID as FieldType, ObjectType } from "@nestjs/graphql"
import { ID } from 'graphql-ws';

@ObjectType('Student')
export class StudentType {
    
    @Field(type => FieldType)
    id: ID

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    isTeacher: boolean
}