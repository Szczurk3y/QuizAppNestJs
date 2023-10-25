import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentAnswer } from "./answer-student.entity";
import { MongoRepository } from "typeorm";
import { CreateStudentAnswerInput } from "./answer-student.input";
import { v4 as uuid } from 'uuid'
import { QuestionAnswerType } from "src/question/question.type";
import { Question } from "src/question/question.entity";
import { ID } from 'graphql-ws';
import { TeacherAnswer } from "src/answer-teacher/answer-teacher.entity";
import { StudentAnswerDto } from "./answer-student.dto";
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service";

@Injectable()
export class StudentAnswerService {

    constructor(
        @InjectRepository(StudentAnswer) private studentAnswerRepository: MongoRepository<StudentAnswer>,
        private teacherAnswerService: TeacherAnswerService
    ) {}


    async createStudentAnswerForQuestion(studentId: string, question: Question, studentAnswerInput: CreateStudentAnswerInput): Promise<StudentAnswer> {
        const studentAnswersForQuestion = this.studentAnswersForQuestion(question, studentAnswerInput)
        const studentAnswer = this.studentAnswerRepository.create({
            id: uuid(),
            questionId: question.id,
            studentId,
            studentAnswers: studentAnswersForQuestion
        })

        const teacherAnswers = await this.teacherAnswerService.getTeacherAnswersForQuestion(question.id)

        return await this.studentAnswerRepository.save(studentAnswer)
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
        // below fixes a bug when receiving JSON object...
        const _type = QuestionAnswerType[question.type] || question.type
        switch(_type) {
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

    static isStudentAnswerCorrect(question: Question, studentAnswer: StudentAnswer, teacherAnswers: TeacherAnswer[]): boolean {
        let isStudentAnswerCorrect: boolean
        switch(question.type) {
            case QuestionAnswerType.SINGLE_CORRECT_ANSWER: {
                const correctTeacherAnswer = teacherAnswers.find(teacherAnswer => teacherAnswer.isCorrect)
                isStudentAnswerCorrect = correctTeacherAnswer.id === studentAnswer.id
            }

            case QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS: {
                const correctTeacherAnswers = teacherAnswers
                    .filter(teacherAnswer => teacherAnswer.isCorrect)
                    .map(teacherAnswer => teacherAnswer.id)
                isStudentAnswerCorrect = studentAnswer.studentAnswers
                    .filter(studentAnswer => correctTeacherAnswers.includes(studentAnswer))
                    .length === correctTeacherAnswers.length
            }

            case QuestionAnswerType.SORTING: {
                const correctSortedAnswerIds = teacherAnswers.map(it => it.id)
                let studentSortedAnswersCorrect = true
                correctSortedAnswerIds.forEach((correctId, index) => {
                    const same = correctId === studentAnswer.studentAnswers[index]
                    if (!same) studentSortedAnswersCorrect = false
                })
                isStudentAnswerCorrect = studentSortedAnswersCorrect
            }
            case QuestionAnswerType.PLAIN_TEXT_ANSWER: {
                const correctTeacherAnswers = teacherAnswers.map(teacherAnswer => teacherAnswer.answer)
                isStudentAnswerCorrect = correctTeacherAnswers.includes(studentAnswer.studentAnswers.join())
            }
        }
        return isStudentAnswerCorrect
    }
}