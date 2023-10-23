import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { v4 as uuid } from 'uuid'
import { QuizAnswer } from "../quiz-answer/quiz-answer.entity";
import { QuizAnswerInput } from "./quiz-answer.input";
import { QuestionService } from "src/question/question.service";
import { StudentService } from "src/student/student.service";
import { StudentAnswerService } from "src/student-answer/answer-student.service";
import { ID } from 'graphql-ws';

@Injectable()
export class AnswerQuizService {

    constructor(
        @InjectRepository(QuizAnswer) private quizAnswerRepository: MongoRepository<QuizAnswer>,
        private questionService: QuestionService,
        private studentService: StudentService,
        private studentAnswerService: StudentAnswerService
    ) {}

    async submitQuizAnswers(answerQuizInput: QuizAnswerInput): Promise<QuizAnswer> {
        // TODO: consider creating another repository for saving studentAnswers
        const { quizId, studentId, answers } = answerQuizInput
        const foundQuestions = await this.questionService.getQuestionsForQuiz(answerQuizInput.quizId)
        const foundStudent = await this.studentService.getStudent(studentId)

        // Validations:
        const checkQuizExists = foundQuestions.length !== 0
        const checkStudentExists = foundStudent != null
        const checkAllQuestionsAnswered = foundQuestions.length === answers.length

        if (checkQuizExists && checkStudentExists && checkAllQuestionsAnswered) {
            // Validating student answers before they are saved in db
            for (const answer of answers) {
                const matchingQuestion = foundQuestions.find((question) => question.id === answer.questionId)
                try {
                    // if below doesn't throw HttpException it means student answer can be inserted into db
                    this.studentAnswerService.studentAnswersForQuestion(matchingQuestion, answer)
                } catch(exception) {
                    // Throwing given exception in order to not perform further with student answers
                    throw exception
                }
            }

            // Performing saving student answers to db
            const studentAnswerIds: ID[] = []
            for await (const answer of answers) {
                const matchingQuestion = foundQuestions.find((question) => question.id === answer.questionId)
                const studentAnswer = await this.studentAnswerService.createStudentAnswerForQuestion(studentId, matchingQuestion, answer)
                studentAnswerIds.push(studentAnswer.id)
            }

            const answeredQuiz = this.quizAnswerRepository.create({
                id: uuid(),
                quizId: quizId,
                studentId: studentId,
                studentAnswerIds: studentAnswerIds
            })

            return this.quizAnswerRepository.save(answeredQuiz)
        } else {
            switch(true) {
                case !checkQuizExists: throw new HttpException("Quiz not found", 404)
                case !checkStudentExists: throw new HttpException("Student not found", 404)
                case !checkAllQuestionsAnswered: throw new HttpException("Please answer to all of the questions.", 400)
            }
        }
    }
}