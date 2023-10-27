import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository, Repository } from "typeorm";
import { TeacherAnswer } from "../model/answer-teacher.entity";
import { CreateTeacherAnswerInput } from "./answer-teacher.input";
import { v4 as uuid } from 'uuid'
import { ID } from 'graphql-ws';

@Injectable()
export class TeacherAnswerService {

    constructor(
        @InjectRepository(TeacherAnswer) private teacherAnswerRepository: Repository<TeacherAnswer>
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
    
    async getTeacherAnswersForQuestion(questionId: ID) {
        return this.teacherAnswerRepository.find({
            where: {
                questionId: questionId
            }
        })
    }

}