import { Question } from "src/question/question.entity";

export class QuizPreview {

    quizId: string
    quizName: string
    teacherFirstName: string
    teacherLastName: string
    questions: Question[]
    
    constructor(quizId: string, quizName: string, teacherFirstName: string, teacherLastName: string, questions: Question[]) {
        this.quizId = quizId
        this.quizName = quizName
        this.teacherFirstName = teacherFirstName
        this.teacherLastName = teacherLastName
        this.questions = questions
    }
}