import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Answer } from "./answer.entity";
import { CreateAnswerInput } from "./answer.input";
import { v4 as uuid } from 'uuid'

@Injectable()
export class AnswerService {

    constructor(
        @InjectRepository(Answer) private answerRepository: MongoRepository<Answer>
    ) { }

    async createAnswer(createAnswerInput: CreateAnswerInput) {
        const { answer, isCorrect, questionId } = createAnswerInput

        const _answer = this.answerRepository.create({
            id: uuid(),
            answer,
            isCorrect,
            questionId
        })

        return this.answerRepository.save(_answer)
    }


    async getAnswers() {
        return this.answerRepository.find()
    }

    async getAnswer(id: string) {
        return this.answerRepository.findOneBy({ id })
    }

    async getAnswersForQuestion(questionid: string) {
        return this.answerRepository.find({
            where: {
                questionId: questionid
            }
        })
    }

}