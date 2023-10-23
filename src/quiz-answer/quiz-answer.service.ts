import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { v4 as uuid } from 'uuid'
import { QuizAnswer } from "../quiz-answer/quiz-answer.entity";
import { QuizAnswerInput } from "./quiz-answer.input";
import { StudentAnswer } from "../student-answer/answer-student.entity";


@Injectable()
export class QuizAnswerService {

    constructor(
        @InjectRepository(QuizAnswer) private quizAnswerRepository: MongoRepository<QuizAnswer>,
        @InjectRepository(StudentAnswer) private answerStudentRepository: MongoRepository<StudentAnswer>,
    ) {}

    async submitAnswersForQuiz(answerQuizInput: QuizAnswerInput): Promise<QuizAnswer> {
        const { quizId, studentId, answers } = answerQuizInput
        const answersForQuiz = answers.map((_answer) => {
            return this.answerStudentRepository.create({
                id: uuid(),
                answer: _answer.answer,
                questionId: _answer.questionId
            })
        })
        const answeredQuizId = uuid()
        const answeredQuiz = this.quizAnswerRepository.create({
            id: answeredQuizId,
            quizId: quizId,
            studentId: studentId,
            answers: answersForQuiz
        })

        return this.quizAnswerRepository.save(answeredQuiz)
    }

    async getQuizAnswerForStudent(quizAnswerId: string, studentId: string): Promise<QuizAnswer> {
        return this.quizAnswerRepository.findOneBy({ id: quizAnswerId, studentId: studentId})
    }

    async getAnswersForQuizAnswer(quizAnswerId: string, studentId: string): Promise<StudentAnswer[]> {
        const answerQuiz = await this.quizAnswerRepository.findOneBy({ id: quizAnswerId, studentId: studentId })
        return answerQuiz.answers
    }
}