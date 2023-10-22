import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { IsNull, MongoRepository } from "typeorm";
import { CreateQuestionInput } from "./question.input";
import { v4 as uuid } from 'uuid'
import { QuizService } from "src/quiz/quiz.service";
import { QuizModule } from "src/quiz/quiz.module";
@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question) private questionRepository: MongoRepository<Question>,
        @Inject(forwardRef(() => QuizService)) private quizService: QuizService
    ) {}

    async createQuestion(
        createQuestionInput: CreateQuestionInput
    ): Promise<Question> {
        const { question, answer, quizId} = createQuestionInput

        const _question = this.questionRepository.create({
            id: uuid(),
            question,
            answer,
            quizId: quizId
        })
        return this.questionRepository.save(_question)
    }

    async getQuestions(): Promise<Question[]> {
        return this.questionRepository.find()
    }

    async getQuestion(id: string): Promise<Question> {
        return this.questionRepository.findOneBy({ id })
    }

    async getQuestionsForQuiz(quizId: string, studentId: string): Promise<Question[]> {
    const quiz = await this.quizService.getQuiz(quizId)
    if (quiz == null) {
        throw Error("Quiz not found.")
    }
    const isAllowed = [...quiz.studentIds, quiz.teacherId].includes(studentId)
    if (isAllowed) {
        const foundQuestions = await this.questionRepository.find({
            quizId: quizId,
        })
        return foundQuestions
    } else {
        throw Error("Student is not allowed to view questions for this quiz.")
    }
}
}