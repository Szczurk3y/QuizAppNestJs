import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class StudentAnswer {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    answer: string

    @Column()
    questionId: string
}