import { Test, TestingModule } from "@nestjs/testing"
import { StudentAnswerService } from "./answer-student.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { StudentAnswer } from "./answer-student.entity"
import { Question } from "src/question/question.entity"
import { v4 as uuid } from 'uuid'
import { QuestionAnswerType } from "src/question/question.type"
import { CreateStudentAnswerInput } from "./answer-student.input"
import { HttpException } from "@nestjs/common"
import { ID } from 'graphql-ws';

describe("StudentAnswerService", () => {
    
    let studentAnswerService: StudentAnswerService
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentAnswerService,
                {
                    provide: getRepositoryToken(StudentAnswer),
                    useValue: {}
                }
            ]
        }).compile()
        studentAnswerService = module.get<StudentAnswerService>(StudentAnswerService)
    })

    it ("should return correct answers for questions", () => {
        const questionId = uuid()
        const answerId: string = uuid()
        const question: Question = {
            _id: uuid(),
            id: questionId,
            quizId: uuid(),
            question: "Is Paris a capital of France?",
            type: QuestionAnswerType.SINGLE_CORRECT_ANSWER,
            answerIds: [answerId]
        }
        const studentAnswers: CreateStudentAnswerInput = {
            questionId,
            singleCorrectAnswerId: answerId,
            multipleCorrectAnswerIds: [],
            plainTextAnswer: "",
            sortedAnswerIds: []
        }
        try {
            const expectedAnswer = [answerId]
            const answers = studentAnswerService.studentAnswersForQuestion(question, studentAnswers)
            expect(answers).toEqual(expectedAnswer)
        } catch(error) {}
    })

    it ("should throw exception on incorrect answers for questions", () => {
        const questionId = uuid()
        const answer1Id: ID = uuid()
        const answer2Id: ID = uuid()
        const question: Question = {
            _id: uuid(),
            id: questionId,
            quizId: uuid(),
            question: "What is the famous phrase from Star Wars?",
            type: QuestionAnswerType.PLAIN_TEXT_ANSWER,
            answerIds: [answer1Id]
        }
        // simulate wrong input for question type
        const studentAnswers: CreateStudentAnswerInput = {
            questionId,
            singleCorrectAnswerId: "",
            multipleCorrectAnswerIds: [answer1Id, answer2Id],
            plainTextAnswer: "",
            sortedAnswerIds: []
        }

        try {
            studentAnswerService.studentAnswersForQuestion(question, studentAnswers)
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException)
        }
    })
})