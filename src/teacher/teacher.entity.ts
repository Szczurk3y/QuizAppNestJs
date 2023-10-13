import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Teacher {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: String

    @Column()
    firstName: string

    @Column()
    lastName: string
}