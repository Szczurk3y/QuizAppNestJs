import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { ID } from 'graphql-ws';

@Entity()
export class StudentAnswer {

    @ObjectIdColumn()
    _id: ID

    @PrimaryColumn()
    id: ID

    @Column()
    studentId: ID

    @Column()
    questionId: ID

    // contains selected answers ids if question type was NOT a plain_text_answer
    // contains some plain text like "abc" if type was a plain_text_answer
    @Column()
    studentAnswers: string[]
}