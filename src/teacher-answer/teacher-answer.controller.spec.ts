import { Test, TestingModule } from "@nestjs/testing"
import { v4 as uuid } from 'uuid'
import { TeacherAnswerController } from "./answer-teacher.controller"
import { TeacherAnswerService } from "./answer-teacher.service"
import { CreateTeacherAnswerInput } from "./answer-teacher.input"

describe('TeacherAnswerController', () => {
    let controller: TeacherAnswerController

    const mockTeacherAnswerController = {
        createTeacherAnswer: jest.fn(input => {
            return {
                _id: uuid(),
                id: uuid(),
                ...input
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TeacherAnswerController],
            providers: [TeacherAnswerService]
        }).overrideProvider(TeacherAnswerService).useValue(mockTeacherAnswerController).compile()
        controller = module.get(TeacherAnswerController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a student', () => {
        const questionId = uuid()
        const teacherAnswer: CreateTeacherAnswerInput = {
            answer: "Paris",
            isCorrect: true,
            questionId: questionId
        }
        expect(controller.create(teacherAnswer)).toEqual({
            _id: expect.any(String),
            id: expect.any(String),
            answer: "Paris",
            isCorrect: true,
            questionId: questionId
        })
    })

})