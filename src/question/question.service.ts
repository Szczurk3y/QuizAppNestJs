import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { MongoRepository } from "typeorm";
import { CreateQuestionInput } from "./question.input";
import { v4 as uuid } from 'uuid'

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question) private questionRepository: MongoRepository<Question>
    ) {}

    async createQuestion(createQuestionInput: CreateQuestionInput): Promise<Question> {
        const { question, answers } = createQuestionInput

        const _question = this.questionRepository.create({
            id: uuid(),
            question,
            answers
        })
        return this.questionRepository.save(_question)
    }

    async getQuestions(): Promise<Question[]> {
        return this.questionRepository.find()
    }

    async getQuestion(id: string): Promise<Question> {
        return this.questionRepository.findOneBy({ id })
    }
}