import { Test, TestingModule } from "@nestjs/testing"
import { v4 as uuid } from 'uuid'
import { StudentService } from "src/student/student.service"
import { Student } from "../model/student.entity"
import { getRepositoryToken } from "@nestjs/typeorm"

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