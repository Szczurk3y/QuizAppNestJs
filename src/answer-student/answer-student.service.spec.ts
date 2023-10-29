import { Test, TestingModule } from "@nestjs/testing"
import { StudentAnswerService } from "./answer-student.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { StudentAnswer } from "../model/answer-student.entity"
import { Question } from "src/model/question.entity"
import { v4 as uuid } from 'uuid'
import { QuestionAnswerType } from "src/question/question.type"
import { HttpException } from "@nestjs/common"

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

    it ("should be defined", () => {
        expect(studentAnswerService).toBeDefined()
    })

    it ("should return answer for question of type: SINGLE CORRECT ANSWER", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "Is Paris a capital of France?",
            type: QuestionAnswerType.SINGLE_CORRECT_ANSWER,
            answerIds: [uuid(), uuid(), uuid(), uuid()]
        }
        const studentAnswerIds = [question.answerIds[0]]
        try {
            const answer = studentAnswerService.getAnswerOrThrow(question, studentAnswerIds, "")
            expect(answer).toEqual(studentAnswerIds)
        } catch(error) {}
    })

    it ("should throw an error for question of type: SINGLE CORRECT ANSWER", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "Is Paris a capital of France?",
            type: QuestionAnswerType.SINGLE_CORRECT_ANSWER,
            answerIds: [uuid(), uuid(), uuid(), uuid()]
        }
        const studentAnswerIds = [question.answerIds[0], question.answerIds[2]]
        try {
            studentAnswerService.getAnswerOrThrow(question, studentAnswerIds, "")
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException)
            expect(error.status).toEqual(400)
        }
    })

    it ("should return answer for question of type: MULTIPLE CORRECT ANSWERS", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "Which of the following programming languages are object-oriented?",
            type: QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS,
            answerIds: [uuid(), uuid(), uuid(), uuid()]
        }
        const studentAnswerIds = [question.answerIds[0], question.answerIds[3]]
        try {
            const answer = studentAnswerService.getAnswerOrThrow(question, studentAnswerIds, "")
            expect(answer).toEqual(studentAnswerIds)
        } catch(error) {}
    })

    it ("should throw an error for question of type: MULTIPLE CORRECT ANSWERS", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "Which of the following programming languages are object-oriented?",
            type: QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS,
            answerIds: [uuid(), uuid(), uuid(), uuid()]
        }
        const answerNotInQuestionAnswers = uuid()
        const studentAnswerIds = [answerNotInQuestionAnswers, question.answerIds[2]]
        try {
            studentAnswerService.getAnswerOrThrow(question, studentAnswerIds, "")
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException)
            expect(error.status).toEqual(400)
        }
    })

    it ("should return answer for question of type: SORTING", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "Arrange the following events in chronological order.",
            type: QuestionAnswerType.SORTING,
            answerIds: [uuid(), uuid(), uuid()]
        }
        const studentAnswerIds = [question.answerIds[0], question.answerIds[1], question.answerIds[2]]
        try {
            const answer = studentAnswerService.getAnswerOrThrow(question, studentAnswerIds, "")
            expect(answer).toEqual(studentAnswerIds)
        } catch(error) {}
    })

    it ("should throw an error for question of type: SORTING", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "Which of the following programming languages are object-oriented?",
            type: QuestionAnswerType.SORTING,
            answerIds: [uuid(), uuid(), uuid()]
        }
        const studentAnswerIds =  [question.answerIds[0], question.answerIds[1]]
        try {
            studentAnswerService.getAnswerOrThrow(question, studentAnswerIds, "")
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException)
            expect((error as HttpException).message).toEqual("Provide all sorted answers ids for Question type: Sorting")
        }
    })

    it ("should return answer for question of type: PLAIN TEXT ANSWER", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "What is the famous phrase from StarWars?",
            type: QuestionAnswerType.PLAIN_TEXT_ANSWER,
            answerIds: [uuid(), uuid(), uuid()]
        }
        const studentPlainAnswer = "I am your father." 
        try {
            const answer = studentAnswerService.getAnswerOrThrow(question, [], studentPlainAnswer)
            expect(answer).toEqual(studentPlainAnswer)
        } catch(error) {}
    })

    it ("should throw an error for question of type: PLAIN TEXT ANSWER", () => {
        const question: Question = {
            id: uuid(),
            quizId: uuid(),
            question: "What is the famous phrase from StarWars?",
            type: QuestionAnswerType.PLAIN_TEXT_ANSWER,
            answerIds: [uuid(), uuid(), uuid()]
        }
        const studentPlainAnswer = ""
        try {
            studentAnswerService.getAnswerOrThrow(question, [], studentPlainAnswer)
        } catch(error) {
            expect(error).toBeInstanceOf(HttpException)
            expect((error as HttpException).message).toEqual("Provide text answer for Question type: Plain Text Answer")
        }
    })
})