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

    it('should return true for quesiton of type: SINGLE CORRECT ANSWER', async () => {
        const questionType = QuestionAnswerType.SINGLE_CORRECT_ANSWER
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "London",
                isCorrect: false
            },
            {
                answer: "Paris",
                isCorrect: true,
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
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeTruthy()
    })

    it('should return true for quesiton of type: SINGLE CORRECT ANSWER', async () => {
        const questionType = QuestionAnswerType.SINGLE_CORRECT_ANSWER
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "London",
                isCorrect: false
            },
            {
                answer: "Paris",
                isCorrect: true,
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
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeTruthy()
    })

    it('should return false for quesiton of type: SINGLE CORRECT ANSWER', async () => {
        const questionType = QuestionAnswerType.SINGLE_CORRECT_ANSWER
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "London",
                isCorrect: false
            },
            {
                answer: "Paris",
                isCorrect: true,
            },
            {
                answer: "Rome",
                isCorrect: true
            },
            {
                answer: "Madrid",
                isCorrect: false
            }
        ]
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeFalsy()
    })

    it('should return true for quesiton of type: MULTIPLE CORRECT ANSWERS', async () => {
        const questionType = QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "Java",
                isCorrect: true
              },
              {
                answer: "C",
                isCorrect: false
              },
              {
                answer: "Python",
                isCorrect: false
              },
              {
                answer: "Ruby",
                isCorrect: true
              }
        ]
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeTruthy()
    })

    it('should return true for quesiton of type: SORTING', async () => {
        const questionType = QuestionAnswerType.SORTING
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "Declaration of Independence",
                isCorrect: true
            },
            {
                answer: "World War II",
                isCorrect: true
            },
            {
                answer: "First Moon Landing.",
                isCorrect: true
            }
        ]
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeTruthy()
    })

    it('should return false for quesiton of type: SORTING', async () => {
        const questionType = QuestionAnswerType.SORTING
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "Declaration of Independence",
                isCorrect: false
            },
            {
                answer: "World War II",
                isCorrect: true
            },
            {
                answer: "First Moon Landing.",
                isCorrect: true
            }
        ]
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeFalsy()
    })

    it('should return true for quesiton of type: PLAIN TEXT ANSWER', async () => {
        const questionType = QuestionAnswerType.PLAIN_TEXT_ANSWER
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "May the Force be with you.",
                isCorrect: true
            },
            {
                answer: "I am your father.",
                isCorrect: true
            },
            {
                answer: "It's a trap!",
                isCorrect: true
            }
        ]
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeTruthy()
    })

    it('should return false for quesiton of type: PLAIN TEXT ANSWER', async () => {
        const questionType = QuestionAnswerType.PLAIN_TEXT_ANSWER
        const allAnswers: CreateTeacherAnswerInput[] = [
            {
                answer: "May the Force be with you.",
                isCorrect: true
            },
            {
                answer: "I am your father.",
                isCorrect: true
            },
            {
                answer: "It's a trap!",
                isCorrect: false
            }
        ]
        expect(QuestionService.checkQuestionIsCorrect(questionType, allAnswers)).toBeFalsy()
    })
})