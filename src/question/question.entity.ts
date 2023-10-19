import { IsUUID } from "class-validator";
import { Quiz } from "src/quiz/quiz.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Question {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    question: string

    @Column()
    answer: string

    @Column()
    quizId: string

}