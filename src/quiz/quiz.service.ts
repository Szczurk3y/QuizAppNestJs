import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "./quiz.entity";
import { MongoRepository } from "typeorm";
import { CreateQuizInput } from "./create-quiz.input";
import { v4 as uuid } from 'uuid'


@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz) private quizRepository: MongoRepository<Quiz>
    ) {}


    async createQuiz(createQuizInput: CreateQuizInput): Promise<Quiz> {
        const { name, teacherId, questions } = createQuizInput
        const quiz = this.quizRepository.create({
            id: uuid(),
            name,
            teacherId,
            questions
        })

        return this.quizRepository.save(quiz)
    }
    
    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find()
    }

    async getQuiz(id: string): Promise<Quiz> {
        return this.quizRepository.findOneBy({ id })
    }

    // TODO: add assigning questions to quiz
}