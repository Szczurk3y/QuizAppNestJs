import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class Quiz {
    
    @PrimaryColumn()
    id: ID

    @Column()
    name: string

    @Column()
    teacherId: ID

    @Column("text", { array: true })
    studentIds: ID[]

    @Column("text", { array: true })
    questionIds: ID[]
}