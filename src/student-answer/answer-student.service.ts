import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentAnswer } from "./answer-student.entity";
import { MongoRepository } from "typeorm";
import { CreateStudentAnswerInput } from "./answer-student.input";
import { v4 as uuid } from 'uuid'
import { QuestionAnswerType } from "src/question/question.type";
import { Question } from "src/question/question.entity";
import { ID } from 'graphql-ws';

@Injectable()
export class StudentAnswerService {

    constructor(
        @InjectRepository(StudentAnswer) private studentAnswerRepository: MongoRepository<StudentAnswer>
    ) {}


    async createStudentAnswerForQuestion(studentId: string, question: Question, studentAnswerInput: CreateStudentAnswerInput): Promise<StudentAnswer> {
        const questionId = studentAnswerInput.questionId
        const studentAnswers = this.studentAnswersForQuestion(question, studentAnswerInput)
        const studentAnswerForQuestion = this.studentAnswerRepository.create({
            id: uuid(),
            questionId,
            studentId,
            studentAnswers: studentAnswers
        })

         return this.studentAnswerRepository.save(studentAnswerForQuestion)
    }

    async getAllAnswers() {
        return this.studentAnswerRepository.find()
    }

    async getStudentAnswer(id: ID): Promise<StudentAnswer> {
        const found = await this.studentAnswerRepository.findOneBy({ id })
        return await this.studentAnswerRepository.findOneBy({ id })
    }

    async getStudentAnswers(ids: ID[]): Promise<StudentAnswer[]> {
        return await this.studentAnswerRepository.find({ 
            where: {
                id: { 
                    $in: ids 
                }
            }
        })
    }

    studentAnswersForQuestion(question: Question, studentAnswerInput: CreateStudentAnswerInput): string[] {
        const { questionId, singleCorrectAnswerId, multipleCorrectAnswerIds, sortedAnswerIds, plainTextAnswer } = studentAnswerInput
        switch(question.type) {
            case QuestionAnswerType.SINGLE_CORRECT_ANSWER: {
                if(singleCorrectAnswerId) {
                    return [singleCorrectAnswerId]
                } else {
                    throw new HttpException("Provide correct answer id for Question type: Single Correct Answer", 400)
                }
            }
            case QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS: {
                if(multipleCorrectAnswerIds.length <= question.answerIds.length) {
                    return multipleCorrectAnswerIds                              
                } else {
                    throw new HttpException("Provide correct answers ids for Question type: Multiple Correct Answers", 400)
                }
            }
            case QuestionAnswerType.SORTING: {
                if(sortedAnswerIds.length === question.answerIds.length) {
                    return sortedAnswerIds
                } else {
                    throw new HttpException("Provide all sorted answers ids for Question type: Sorting", 400)
                }
            }
            case QuestionAnswerType.PLAIN_TEXT_ANSWER: {
                if (plainTextAnswer) {
                    return [plainTextAnswer]                            
                } else {
                    throw new HttpException("Provide text answer for Question type: Plain Text Answer", 400)
                }
            }
        }
    }
}