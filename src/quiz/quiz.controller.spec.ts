import { Test, TestingModule } from "@nestjs/testing"
import { QuizController } from "./quiz.controller"
import { QuizService } from "./quiz.service"
import { v4 as uuid } from 'uuid'
import { StudentService } from "src/student/student.service"
import { QuestionService } from "src/question/question.service"
import { CreateQuizInput } from "./create-quiz.input"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Quiz } from "../model/quiz.entity"
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service"

describe("QuizController", () => {
    let quizController: QuizController

    const mockQuizService = {
        createQuiz: jest.fn(input => {
            return {
                _id: uuid(),
                id: uuid(),
                name: "Quiz 1",
                teacherId: uuid(),
                studentIds: [],
                questionIds: []
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuizController],
            providers: [QuizService]
        }).overrideProvider(QuizService).useValue(mockQuizService).compile()
        quizController = module.get<QuizController>(QuizController)
    })

    it('should be defined', () => {
        expect(quizController).toBeDefined()
    })

    it('should create a quiz', () => {
        const quizInput: CreateQuizInput = {
            name: "Quiz 1",
            teacherId: uuid(),
            questions: [],
            studentIds: []
        }
        expect(quizController.create(quizInput)).toEqual({
            _id: expect.any(String),
            id: expect.any(String),
            name: "Quiz 1",
            teacherId: expect.any(String),
            studentIds: [],
            questionIds: []
        })
    })
})

describe('QuizService', () => {

    let quizService: QuizService
    
    const mockQuizRepository = {
        find: jest.fn(input => {
            return [{
                _id: uuid(),
                id: uuid(),
                name: "Quiz 1",
                teacherId: uuid(),
                studentIds: [],
                questionIds: []
            }]
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QuizController],
            providers: [
                QuizService, 
                {
                    provide: getRepositoryToken(Quiz),
                    useValue: mockQuizRepository
                },
                {
                    provide: QuestionService,
                    useValue: {}
                },
                {
                    provide: StudentService,
                    useValue: {}
                },
                {
                    provide: TeacherAnswerService,
                    useValue: {}
                }
        ]
        }).compile()
        quizService = module.get<QuizService>(QuizService)
    })

    it('should be defined', () => {
        expect(quizService).toBeDefined()
    })
})