import { Test, TestingModule } from "@nestjs/testing"
import { v4 as uuid } from 'uuid'
import { StudentService } from "src/student/student.service"
import { StudentController } from "./student.controller"
import { CreateStudentInput } from "./create-student.input"

describe('StudentController', () => {
    let controller: StudentController

    const mockkStudentService = {
        createStudent: jest.fn(input => {
            return {
                _id: uuid(),
                id: uuid(),
                ...input
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StudentController],
            providers: [StudentService]
        }).overrideProvider(StudentService).useValue(mockkStudentService).compile()
        controller = module.get<StudentController>(StudentController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a student', () => {
        const student: CreateStudentInput = {
            firstName: "John",
            lastName: "Doe",
            isTeacher: true
        }
        expect(controller.create(student)).toEqual({
            _id: expect.any(String),
            id: expect.any(String),
            firstName: "John",
            lastName: "Doe",
            isTeacher: true
        })
    })

})