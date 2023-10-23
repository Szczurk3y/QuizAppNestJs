import { Test, TestingModule } from "@nestjs/testing"
import { v4 as uuid } from 'uuid'
import { QuestionController } from "./question.controller"
import { QuestionService } from "./question.service"
import { CreateQuestionInput } from "./question.input"
import { QuestionAnswerType } from "./question.type"
import { QuizService } from "src/quiz/quiz.service"
import { TeacherAnswerService } from "src/teacher-answer/answer-teacher.service"

describe('QuestionController', () => {
    let controller: QuestionController

    let quizService: QuizService
    let teacherAnswerService: TeacherAnswerService

    const mockkQuestionService = {
        createQuestion: jest.fn(input => {
            return {
                _id: uuid(),
                id: uuid(),
                ...input
            }
        }),
        getQuestionsForQuiz:  jest.fn()
    }
    const mockkQuizService = {}
    const mockkTeacherAnswerService = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuestionController],
            providers: [
                QuestionService,
                QuizService
            ]
        })
        .overrideProvider(QuestionService).useValue(mockkQuestionService)
        .overrideProvider(QuizService).useValue(mockkQuizService).compile()

        controller = module.get<QuestionController>(QuestionController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a question', () => {
        const quizId = uuid()
        const questionId = uuid()
        const question: CreateQuestionInput = {
            question: "What is the capital of France?",
            quizId: quizId,
            type: QuestionAnswerType.SINGLE_CORRECT_ANSWER,
            answers: [
                {
                    answer: "London",
                    isCorrect: false,
                    questionId: questionId
                },
                {
                    answer: "Paris",
                    isCorrect: true,
                    questionId: questionId
                }, 
                {
                    answer: "Rome",
                    isCorrect: false,
                    questionId: questionId
                },
                {
                    answer: "Madrid",
                    isCorrect: false,
                    questionId: questionId
                }
               ] 
            
        }
        expect(controller.create(question)).toEqual({
            _id: expect.any(String),
            id: expect.any(String),
            quizId: quizId,
            question: "What is the capital of France?",
            type: expect.any(String),
            answerIds: expect.any([String])
        })
    })

})