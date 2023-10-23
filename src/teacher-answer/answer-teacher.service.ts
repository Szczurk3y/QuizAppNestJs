import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { TeacherAnswer } from "./answer-teacher.entity";
import { CreateAnswerTeacherInput } from "./answer-teacher.input";
import { v4 as uuid } from 'uuid'

@Injectable()
export class TeacherAnswerService {

    constructor(
        @InjectRepository(TeacherAnswer) private answerRepository: MongoRepository<TeacherAnswer>
    ) { }

    async createAnswer(createAnswerInput: CreateAnswerTeacherInput) {
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