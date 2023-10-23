import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { TeacherAnswer } from "./answer-teacher.entity";
import { CreateTeacherAnswerInput } from "./answer-teacher.input";
import { v4 as uuid } from 'uuid'

@Injectable()
export class TeacherAnswerService {

    constructor(
        @InjectRepository(TeacherAnswer) private teacherAnswerRepository: MongoRepository<TeacherAnswer>
    ) { }

    async createTeacherAnswer(createAnswerInput: CreateTeacherAnswerInput) {
        const { answer, isCorrect, questionId } = createAnswerInput

        const _answer = this.teacherAnswerRepository.create({
            id: uuid(),
            answer,
            isCorrect,
            questionId
        })

        return this.teacherAnswerRepository.save(_answer)
    }


    async getTeacherAnswers() {
        return this.teacherAnswerRepository.find()
    }

    async getTeacherAnswer(id: string) {
        return this.teacherAnswerRepository.findOneBy({ id })
    }

    async getTeacherAnswersForQuestion(questionId: string) {
        return this.teacherAnswerRepository.find({
            where: {
                questionId: questionId
            }
        })
    }

}