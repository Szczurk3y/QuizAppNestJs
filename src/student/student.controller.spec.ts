import { Test, TestingModule } from "@nestjs/testing"
import { v4 as uuid } from 'uuid'
import { StudentService } from "src/student/student.service"
import { Student } from "../model/student.entity"
import { getRepositoryToken } from "@nestjs/typeorm"
import { StudentController } from "./student.controller"
import { CreateStudentInput } from "./create-student.input"

describe('StudentController', () => {
    let studentController: StudentController
    let mockStudentService = {
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
            providers: [
                StudentService,
                {
                    provide: getRepositoryToken(Student),
                    useValue: {}
                }
            ]
        }).overrideProvider(StudentService).useValue(mockStudentService).compile()
        studentController = module.get<StudentController>(StudentController)
    })

    it('should be defined', () => {
        expect(studentController).toBeDefined()
    })

    it('should create a teacher', () => {
        const student: CreateStudentInput = {
            firstName: "John",
            lastName: "Doe",
            isTeacher: true
        }
        expect(studentController.create(student)).toEqual({
            _id: expect.any(String),
            id: expect.any(String),
            firstName: "John",
            lastName: "Doe",
            isTeacher: true
        })
    })
})

describe("Student Service", () => {
    let studentService: StudentService

    let mockStudentRepository = {
        find: jest.fn(input => {
            return [{
                id: uuid(),
                firstName: "John",
                lastName: "Doe",
                isTeacher: true
            }]
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentService,
                {
                    provide: getRepositoryToken(Student),
                    useValue: mockStudentRepository
                }
            ]
        }).compile()
        studentService = module.get<StudentService>(StudentService)
    })

    it("should return true if student is a teacher", () => {
        const student: Student = {
            id: uuid(),
            firstName: "",
            lastName: "",
            isTeacher: true
        } 
        jest.spyOn(studentService, "getStudent").mockResolvedValue(student)
        const _isTeacher = studentService.isTeacher(student.id)
        expect(_isTeacher).toBeTruthy()
    })

    it("Should find students", async () => {
        const foundStudents = await studentService.getStudents()
        expect(foundStudents).toContainEqual({
            id: expect.any(String),
            firstName: "John",
            lastName: "Doe",
            isTeacher: true
        })
    })
})