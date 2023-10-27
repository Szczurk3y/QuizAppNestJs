import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class QuizAnswer {

    @PrimaryColumn()
    id: ID

    @Column()
    quizId: ID

    @Column()
    studentId: ID

    @Column("text", { array: true })
    studentAnswerIds: ID[]
}