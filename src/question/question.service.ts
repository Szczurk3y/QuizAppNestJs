import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "../model/question.entity";
import { Repository } from "typeorm";
import { CreateQuestionInput } from "./question.input";
import { v4 as uuid } from 'uuid'
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service";
import { QuestionAnswerType } from "./question.type";
import { CreateTeacherAnswerInput } from "src/answer-teacher/answer-teacher.input";
import { ID } from 'graphql-ws';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        private answerService: TeacherAnswerService
    ) { }

    async createQuestion(
        quizId: ID,
        createQuestionInput: CreateQuestionInput
    ): Promise<Question> {
        const { question, type, answers } = createQuestionInput
        const questionId = uuid()
        const answerIds: ID[] = []
        for await (const answer of answers) {
            const answerId = (await this.answerService.createTeacherAnswer(questionId, answer)).id
            answerIds.push(answerId)
        }
        const _question = this.questionRepository.create({
            id: questionId,
            quizId,
            question,
            type,
            answerIds,
        })
        return this.questionRepository.save(_question)
    }

    async getQuestionsForQuiz(quizId: ID): Promise<Question[]> {
        return this.questionRepository.find({ 
            where: { 
                quizId: quizId
            } 
        })
    }
    
    /*
        SINGLE_CORRECT_ANSWER:
            Only one in provided answers can be set to to correctAnswer: true
        MULTIPLE_CORRECT_ANSWERS:
            All answers might be false, and all answers might be true.
        SORTING:
            In a sorting mode all answers must be provided in a sorted manner.
            Each answer must be set to correctAnswer: true
        PLAIN_TEXT_ANSWER:
            Each answer must be set to correctAnswer: true
            but the answers should not be displayed on the screen
            instead a user will answer in a text mode and then we can
            compare the given answer with our correct answers.
    */
    static checkQuestionIsCorrect(type: QuestionAnswerType, answers: CreateTeacherAnswerInput[]): Boolean {
        const answersCount = answers.length
        const actualCorrectAnswersCount = answers.filter((answer) => answer.isCorrect).length
        // below fixes a bug when receiving JSON object...
        const _type = QuestionAnswerType[type] || type
        switch(_type) {
            case QuestionAnswerType.SINGLE_CORRECT_ANSWER: {
                const expectedCorrectAnswers = 1
                return actualCorrectAnswersCount === expectedCorrectAnswers
            }
            case QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS: {
                return true 
            }
            case QuestionAnswerType.PLAIN_TEXT_ANSWER: {
                const expectedCorrectAnswer = answersCount
                return actualCorrectAnswersCount === expectedCorrectAnswer
            }
            case QuestionAnswerType.SORTING: {
                const expectedCorrectAnswer = answersCount
                return actualCorrectAnswersCount === expectedCorrectAnswer
            }
        }
    }
}