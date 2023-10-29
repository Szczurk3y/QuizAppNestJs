import { Test, TestingModule } from "@nestjs/testing"
import { QuizController } from "./quiz.controller"
import { QuizService } from "./quiz.service"
import { v4 as uuid } from 'uuid'
import { StudentService } from "src/student/student.service"
import { QuestionService } from "src/question/question.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Quiz } from "../model/quiz.entity"
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service"
import { Student } from "src/model/student.entity"
import { CreateQuizInput } from "./create-quiz.input"
import { CreateQuestionInput } from "src/question/question.input"
import { QuestionAnswerType } from "src/question/question.type"
import { TeacherAnswer } from "src/model/answer-teacher.entity"

describe('QuizService', () => {
    let quizService: QuizService

    const answersInput = [
        {
            answer: "London",
            isCorrect: false,
        },
        {
            answer: "Paris",
            isCorrect: true
        },
        {
            answer: "Rome",
            isCorrect: false
        },
        {
            answer: "Madrid",
            isCorrect: false
        }
    ]
    
    const mockQuizRepository = {
        create: jest.fn(input => {
            return input
        }),
        save: jest.fn(input => {})
    }

    const mockStudentService = {
        getStudent: jest.fn(teacherId => {
            return {
                id: teacherId,
                firstName: "John",
                lastName: "Pole",
                isTeacher: true
            }
        }),
        getManyStudents: jest.fn(studentIds => {
            const students: Student[] = []
            for (const _id of studentIds) {
                const student = {
                    id: _id,
                    firstName: "John",
                    lastName: "Doe",
                    isTeacher: false
                }
                students.push(student)
            }
            return students
        })
    }

    const mockQuestionService = {
        createQuestion: jest.fn((quizId, questionInput: CreateQuestionInput) => {
            const answerIds = questionInput.answers.map(answer => uuid())
            return {
                id: uuid(),
                quizId: quizId,
                question: questionInput.question,
                type: questionInput.type,
                answerIds
            }
        })
    }

    const mockTeacherAnswerService = {
        getTeacherAnswersForQuestion: jest.fn(questionId => {
            const teacherAnswers: TeacherAnswer[] = answersInput.map(input => {
                return {
                    id: uuid(),
                    questionId,
                    isCorrect: input.isCorrect,
                    answer: input.answer
                }
            })
            return teacherAnswers
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
                    useValue: mockQuestionService
                },
                {
                    provide: StudentService,
                    useValue: mockStudentService
                },
                {
                    provide: TeacherAnswerService,
                    useValue: mockTeacherAnswerService
                }
        ]
        }).compile()
        quizService = module.get<QuizService>(QuizService)
    })

    it('should be defined', () => {
        expect(quizService).toBeDefined()
    })

    it('should create a quiz', async () => {
        const quizName = "Quiz 1"
        const teacherId: string = uuid()
        const assignedStudentIds: string[] = [uuid(), uuid()]
        const questions: CreateQuestionInput[] = [
            {
                question: "What is the capital of France?",
                type: QuestionAnswerType.SINGLE_CORRECT_ANSWER,
                answers: answersInput
            }
        ]

        const quizInput: CreateQuizInput = {
            name: quizName,
            teacherId: teacherId,
            studentIds: assignedStudentIds,
            questions: questions,
        }
        const quizDto = await quizService.createQuiz(quizInput)

        expect(quizDto.name).toEqual(quizName)
        expect(quizDto.teacher.id).toEqual(teacherId)
        expect(quizDto.questions[0].question).toEqual(questions[0].question)
        expect(
            quizDto.questions[0].answers.map(answer => {
                return {
                    answer: answer.answer,
                    isCorrect: answer.isCorrect
                }
            })
        ).toEqual(questions[0].answers)

    })
})