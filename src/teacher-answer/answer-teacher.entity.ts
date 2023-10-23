import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class TeacherAnswer {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    answer: string

    @Column()
    isCorrect: boolean

    @Column()
    questionId: string
}