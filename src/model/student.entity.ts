import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class Student {

    @PrimaryColumn()
    id: ID

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isTeacher: boolean
}