import { Test, TestingModule } from "@nestjs/testing"
import { QuizController } from "./quiz.controller"
import { QuizService } from "./quiz.service"
import { v4 as uuid } from 'uuid'
import { QuestionAnswerType } from "src/question/question.type"
import { CreateQuizInput } from "./create-quiz.input"
import { StudentService } from "src/student/student.service"
import { QuestionService } from "src/question/question.service"

describe('QuizController', () => {
    const { quizId, questionId, teacherId, student1Id, student2Id } = uuid()
    let controller: QuizController

    const mockQuestionService = {}
    const mockStudentService = {
        isTeacher: jest.fn((teacherId => true)),
        getManyStudents: jest.fn((studentIds => studentIds.length))
    }
    const mockkQuizService = {
        createQuiz: jest.fn(input => {
            return {
                _id: uuid(),
                id: uuid(),
                ...input
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuizController],
            providers: [
                QuizService, 
                {
                    provide: QuestionService,
                    useValue: mockQuestionService
                },
                {
                    provide: StudentService,
                    useValue: mockStudentService
                }
        ]
        }).overrideProvider(QuizService).useValue(mockkQuizService).compile()
        controller = module.get<QuizController>(QuizController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a quiz', () => {
        const quiz: CreateQuizInput = {
            name: "Quiz 1",
            teacherId: teacherId,
            questions: [
                {
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
            ],
            studentIds: [student1Id, student2Id]
        }
        expect(controller.create(quiz)).toEqual({
            _id: expect.any(String),
            id: expect.any(String),
            name: "Quiz 1",
            teacherId: teacherId,
            student1Ids: [student1Id, student2Id]
        })
    })

})