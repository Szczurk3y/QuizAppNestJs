import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository, Repository } from "typeorm";
import { v4 as uuid } from 'uuid'
import { QuizAnswer } from "../model/quiz-answer.entity";
import { QuizAnswerInput } from "./quiz-answer.input";
import { QuestionService } from "src/question/question.service";
import { StudentService } from "src/student/student.service";
import { StudentAnswerService } from "src/answer-student/answer-student.service";
import { ID } from 'graphql-ws';
import { QuizAnswerDto } from "./quiz-answer.dto";
import { Student } from "src/model/student.entity";
import { StudentAnswer } from "src/model/answer-student.entity";
import { QuizService } from "src/quiz/quiz.service";
import { StudentAnswerDto } from "src/answer-student/answer-student.dto";
import { Question } from "src/model/question.entity";
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service";
import { QuestionAnswerType } from "src/question/question.type";
import { StudentDto } from "src/student/student.dto";

@Injectable()
export class AnswerQuizService {

    constructor(
        @InjectRepository(QuizAnswer) private quizAnswerRepository: Repository<QuizAnswer>,
        private questionService: QuestionService,
        private studentService: StudentService,
        private quizService: QuizService,
        private studentAnswerService: StudentAnswerService,
        private teacherAnswerService: TeacherAnswerService
    ) {}

    async submitQuizAnswers(answerQuizInput: QuizAnswerInput): Promise<QuizAnswerDto> {
        const { quizId, studentId, answers } = answerQuizInput

        const foundQuiz = await this.quizService.getQuiz(quizId, studentId)
        const foundQuestions = await this.questionService.getQuestionsForQuiz(answerQuizInput.quizId)
        const foundStudent = await this.studentService.getStudent(studentId)

        // Validations:
        const checkQuizExists = foundQuiz != null
        const checkStudentExists = foundStudent != null
        const checkAllQuestionsAnswered = foundQuestions.length === answers.length

        if (checkQuizExists && checkStudentExists && checkAllQuestionsAnswered) {
            // Validating student answers before they are saved in db
            for (const answer of answers) {
                const matchingQuestion = foundQuestions.find((question) => question.id === answer.questionId)
                try {
                    // if below doesn't throw HttpException it means student answer can be inserted into db
                    this.studentAnswerService.collectStudentAnswersFromInput(matchingQuestion, answer)
                } catch(exception) {
                    // Throwing given exception in order not to perform further with student answers
                    throw exception
                }
            }

            // Performing saving student answers to db
            const studentAnswers: StudentAnswer[] = []
            for await (const answer of answers) {
                const matchingQuestion = foundQuestions.find((question) => question.id === answer.questionId)
                const studentAnswer = await this.studentAnswerService.createStudentAnswerForQuestion(studentId, matchingQuestion, answer)
                studentAnswers.push(studentAnswer)
            }

            const quizAnswer = this.quizAnswerRepository.create({
                id: uuid(),
                quizId: quizId,
                studentId: studentId,
                studentAnswerIds: studentAnswers.map(answer => answer.id)
            })
            await this.quizAnswerRepository.save(quizAnswer)

            return await this.createQuizAnswerDto(quizAnswer.id, foundQuiz.name, foundStudent, foundQuestions, studentAnswers)
        } else {
            switch(true) {
                case !checkQuizExists: throw new HttpException("Quiz not found", 404)
                case !checkStudentExists: throw new HttpException("Student not found", 404)
                case !checkAllQuestionsAnswered: throw new HttpException("Please answer to all of the questions.", 400)
            }
        }
    }

    private async createQuizAnswerDto(id: ID, quizName: string, student: Student, questions: Question[], studentAnswers: StudentAnswer[]): Promise<QuizAnswerDto>  {
        const studentAnswersDto: StudentAnswerDto[] = []

        for await (const studentAnswer of studentAnswers) {
            const teacherAnswersForQuestion = await this.teacherAnswerService.getTeacherAnswersForQuestion(studentAnswer.questionId)
            const matchingQuestion = questions.find(question => question.id === studentAnswer.questionId)

            const matchingTeacherAnswers = teacherAnswersForQuestion
                .filter(it => studentAnswer.studentAnswers.includes(it.id))
                .map(it => it.answer)

            const _matchingQuestiontype = QuestionAnswerType[matchingQuestion.type] || matchingQuestion.type
            const answerLabel = (_matchingQuestiontype != QuestionAnswerType.PLAIN_TEXT_ANSWER) 
                ? matchingTeacherAnswers.join()
                : studentAnswer.studentAnswers.join()
            
            const isStudentAnswerCorrect = StudentAnswerService.isStudentAnswerCorrect(matchingQuestion, studentAnswer, teacherAnswersForQuestion)
            
            const answerDto: StudentAnswerDto = {
                questionId: studentAnswer.questionId,
                question: matchingQuestion.question,
                questionType: _matchingQuestiontype,
                studentAnswer: answerLabel,
                isCorrect: isStudentAnswerCorrect
            }

            studentAnswersDto.push(answerDto)
        }

        const studentDto: StudentDto = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            isTeacher: student.isTeacher
        }

        const quizAnswerDto: QuizAnswerDto = {
            id: id,
            quizName: quizName,
            student: studentDto,
            studentAnswers: studentAnswersDto
        }

        return quizAnswerDto
    }
}