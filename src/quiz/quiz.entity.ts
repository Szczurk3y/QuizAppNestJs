import { Question } from "src/question/question.entity";
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Quiz {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    teacherId: string
}