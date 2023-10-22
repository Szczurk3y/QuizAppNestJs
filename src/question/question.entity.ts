import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { QuestionAnswerType } from "./question.type";

@Entity()
export class Question {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    quizId: string

    @Column()
    question: string

    @Column({
        type: "enum",
        enum: QuestionAnswerType
    })
    type: QuestionAnswerType

    @Column()
    answerIds: string[]
}