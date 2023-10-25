import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class TeacherAnswer {

    @ObjectIdColumn()
    _id: ID

    @PrimaryColumn()
    id: ID

    @Column()
    answer: string

    @Column()
    isCorrect: boolean = false

    @Column()
    questionId: string
}