import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { QuestionAnswerType } from "./question.type";
import { ID } from 'graphql-ws';

@Entity()
export class Question {

    @ObjectIdColumn()
    _id: ID

    @PrimaryColumn()
    id: ID

    @Column()
    quizId: ID

    @Column()
    question: string

    @Column({
        type: "enum",
        enum: QuestionAnswerType
    })
    type: QuestionAnswerType

    @Column()
    answerIds: ID[]
}