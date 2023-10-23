import { StudentAnswer } from "src/student-answer/answer-student.entity";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class QuizAnswer {

    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
    quizId: string

    @Column()
    studentId: string

    @Column(type => StudentAnswer)
    answers: StudentAnswer[]
}