import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { MongoRepository } from "typeorm";
import { CreateQuestionInput } from "./question.input";
import { v4 as uuid } from 'uuid'
import { QuizService } from "src/quiz/quiz.service";
import { TeacherAnswerService } from "src/teacher-answer/answer-teacher.service";
import { QuestionAnswerType } from "./question.type";
import { CreateAnswerTeacherInput } from "src/teacher-answer/answer-teacher.input";
@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question) private questionRepository: MongoRepository<Question>,
        @Inject(forwardRef(() => QuizService)) private quizService: QuizService,
        private answerService: TeacherAnswerService
    ) { }

    async createQuestion(
        createQuestionInput: CreateQuestionInput
    ): Promise<Question> {
        const { question, quizId, type, answers } = createQuestionInput
        const questionId = uuid()
        const answerIds: string[] = []
        for await (const answer of answers) {
            answer.questionId = questionId
            const answerId = (await this.answerService.createAnswer(answer)).id
            answerIds.push(answerId)
        }
        const _question = this.questionRepository.create({
            id: questionId,
            quizId,
            question,
            type,
            answerIds,
        })
        return this.questionRepository.save(_question)
    }

    async getQuestions(): Promise<Question[]> {
        return this.questionRepository.find()
    }

    async getQuestion(id: string): Promise<Question> {
        return this.questionRepository.findOneBy({ id })
    }

    async getQuestionsForQuiz(quizId: string, studentId: string): Promise<Question[]> {
        const quiz = await this.quizService.getQuiz(quizId)
        if (quiz == null) {
            throw Error("Quiz not found.")
        }
        const isAllowed = [...quiz.studentIds, quiz.teacherId].includes(studentId)
        if (isAllowed) {
            const foundQuestions = await this.questionRepository.find({
                quizId: quizId,
            })
            return foundQuestions
        } else {
            throw Error("Student is not allowed to view questions for this quiz.")
        }
    }
    
    checkQuestionIsCorrect(type: QuestionAnswerType, answers: CreateAnswerTeacherInput[]): Boolean {
        const answersCount = answers.length
        const actualCorrectAnswers = answers.filter((answer) => answer.isCorrect).length

        switch(type) {
            case QuestionAnswerType.SINGLE_CORRECT_ANSWER: {
                // In provided answers, only one can be set to to correctAnswer: true
                const expectedCorrectAnswers = 1
                return actualCorrectAnswers == expectedCorrectAnswers
            }
            case QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS: {
                // All answers might be false, and all answers might be true.
                return true 
            }
            case QuestionAnswerType.PLAIN_TEXT_ANSWER: {
                // Each answer must be set to correctAnswer: true
                // but the answers should not be displayed on the screen
                // instead a user answers in a text mode and then we can
                // compare the answer with our correct answers.
                const expectedCorrectAnswer = answersCount
                return actualCorrectAnswers == expectedCorrectAnswer
            }
            case QuestionAnswerType.SORTING: {
                // In sorting mode all answers must be provided in a sorted manner.
                // Each answer must be set to correctAnswer: true
                const expectedCorrectAnswer = answersCount
                return actualCorrectAnswers == expectedCorrectAnswer
            }
        }
    }
}