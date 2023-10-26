import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class QuizAnswer {

    @ObjectIdColumn()
    _id: ID

    @PrimaryColumn()
    id: ID

    @Column()
    quizId: ID

    @Column()
    studentId: ID

    @Column()
    studentAnswerIds: ID[]
}