import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class Quiz {

    @ObjectIdColumn()
    _id: ID

    @PrimaryColumn()
    id: ID

    @Column()
    name: string

    @Column()
    teacherId: ID

    @Column()
    studentIds: ID[]

    @Column()
    questionIds: ID[]
}