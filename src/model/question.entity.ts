import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { QuestionAnswerType } from "../question/question.type";
import { ID } from 'graphql-ws';

@Entity()
export class Question {

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

    @Column("text", { array: true })
    answerIds: ID[]
}