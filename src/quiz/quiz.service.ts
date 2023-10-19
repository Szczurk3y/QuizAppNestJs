import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "./quiz.entity";
import { MongoRepository } from "typeorm";
import { CreateQuizInput } from "./create-quiz.input";
import { v4 as uuid } from 'uuid'
import { Question } from "src/question/question.entity";
import { QuestionService } from "src/question/question.service";
import { CreateQuestionInput } from "src/question/question.input";


@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz) private quizRepository: MongoRepository<Quiz>,
        private questionService: QuestionService
    ) {}


    async createQuiz(createQuizInput: CreateQuizInput): Promise<Quiz> {
        const { name, teacherId, questions } = createQuizInput
        const quizId = uuid()
        for await (const question of questions) {
            question.quizId = quizId
            this.questionService.createQuestion(question)
        }
        const quiz = this.quizRepository.create({
            id: quizId,
            name,
            teacherId
        })

        return this.quizRepository.save(quiz)
    }
    
    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find()
    }

    async getQuiz(id: string): Promise<Quiz> {
        return this.quizRepository.findOneBy( { id })
    }
}