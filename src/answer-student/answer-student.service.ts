import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentAnswer } from "../model/answer-student.entity";
import { Repository } from "typeorm";
import { CreateStudentAnswerInput } from "./answer-student.input";
import { v4 as uuid } from 'uuid'
import { QuestionAnswerType } from "src/question/question.type";
import { Question } from "src/model/question.entity";
import { TeacherAnswer } from "src/model/answer-teacher.entity";
import { ID } from 'graphql-ws';

@Injectable()
export class StudentAnswerService {

    constructor(
        @InjectRepository(StudentAnswer) private studentAnswerRepository: Repository<StudentAnswer>
    ) {}


    async createStudentAnswerForQuestion(studentId: string, question: Question, studentAnswerInput: CreateStudentAnswerInput): Promise<StudentAnswer> {
        const studentAnswersForQuestion = this.getAnswerOrThrow(question, studentAnswerInput.studentAnswerIds, studentAnswerInput.plainTextAnswer)
        const studentAnswer = this.studentAnswerRepository.create({
            id: uuid(),
            questionId: question.id,
            studentId,
            studentAnswers: studentAnswersForQuestion
        })

        return await this.studentAnswerRepository.save(studentAnswer)
    }

    getAnswerOrThrow(question: Question, studentAnswerIds: ID[], plainTextAnswer: string): string[] {
        if (!question) {
            throw new HttpException("Provide correct quesiton id.", 400)
        } else {
            // below fixes a bug when receiving a JSON object...
            const _type = QuestionAnswerType[question.type] || question.type
            switch(_type) {
                case QuestionAnswerType.SINGLE_CORRECT_ANSWER: {
                    const singleAnswerProvided = studentAnswerIds.length === 1
                    const existingIdProvided = question.answerIds.includes(studentAnswerIds.join())
                    switch(true) {
                        case !singleAnswerProvided: {
                            throw new HttpException("Provide single answer for Question type: Single Correct Answer", 400)    
                        }
                        case !existingIdProvided: {
                            throw new HttpException("Provide existing answer id for Question type: Single Correct Answer", 400)
                        }
                    }
                    return studentAnswerIds
                }
                case QuestionAnswerType.MULTIPLE_CORRECT_ANSWERS: {
                    const multipleAnswersProvided = studentAnswerIds.length <= question.answerIds.length
                    const existingIdsProvided = studentAnswerIds.every(answerId => question.answerIds.includes(answerId))
                    switch(true) {
                        case !multipleAnswersProvided: {
                            throw new HttpException("Provide correct amount of answers for Question type: Multiple Correct Answers", 400)
                        }
                        case !existingIdsProvided: {
                            throw new HttpException("Provide existing answers ids for Question type: Multiple Correct Answers", 400)
                        }
                    }
                    return studentAnswerIds                              
                }
                case QuestionAnswerType.SORTING: {
                    const sortedAnswersProvided = studentAnswerIds.length === question.answerIds.length
                    const existingIdsProvided = studentAnswerIds.every(answerId => question.answerIds.includes(answerId))
                    switch(true) {
                        case !sortedAnswersProvided: {
                            throw new HttpException("Provide all sorted answers ids for Question type: Sorting", 400)
                        }
                        case !existingIdsProvided: {
                            throw new HttpException("Provide existing answers ids for Question type: Sorting", 400)
                        }
                    }
                    return studentAnswerIds
                }
                case QuestionAnswerType.PLAIN_TEXT_ANSWER: {
                    const plainTextAnswerProvided = plainTextAnswer
                    switch(true) {
                        case !plainTextAnswerProvided: {
                            throw new HttpException("Provide text answer for Question type: Plain Text Answer", 400)
                        }
                    }
                    return [plainTextAnswer]                            
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