import { v4 as uuid } from 'uuid'
import { QuestionService } from "./question.service"
import { QuestionAnswerType } from "./question.type"
import { CreateTeacherAnswerInput } from "src/answer-teacher/answer-teacher.input"
import { Test, TestingModule } from '@nestjs/testing'
import { Question } from '../model/question.entity'
import { TeacherAnswerService } from 'src/answer-teacher/answer-teacher.service'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('QuestionService', () => {
    let questionService: QuestionService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionService,
                {
                    provide: getRepositoryToken(Question),
                    useValue: {}
                },
                {
                    provide: TeacherAnswerService,
                    useValue: {}
                }
            ]
        }).compile()
        questionService = module.get<QuestionService>(QuestionService)
    })

    it('should be defined', () => {
        expect(questionService).toBeDefined()
    })



    it('should check question is correct', async () => {
        const questionType = QuestionAnswerType.PLAIN_TEXT_ANSWER
        const answer: CreateTeacherAnswerInput = {
            answer: "Paris",
            isCorrect: true,
            questionId: uuid()
        }
        expect(QuestionService.checkQuestionIsCorrect(questionType, [answer])).toBeTruthy()
    })
})