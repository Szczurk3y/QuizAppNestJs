import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "../model/quiz.entity";
import { Repository } from "typeorm";
import { CreateQuizInput } from "./create-quiz.input";
import { v4 as uuid } from 'uuid'
import { QuestionService } from "src/question/question.service";
import { StudentService } from "src/student/student.service";
import { ID } from 'graphql-ws';
import { QuizDto } from "./quiz.dto";
import { QuestionDto } from "src/question/question.dto";
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service";
import { TeacherAnswerDto } from "src/answer-teacher/answer-teacher.dto";
import { Student } from "src/model/student.entity";
import { Question } from "src/model/question.entity";

@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
        private questionService: QuestionService,
        private studentService: StudentService,
        private teacherAnswerService: TeacherAnswerService
    ) { }


    async createQuiz(createQuizInput: CreateQuizInput): Promise<QuizDto> {
        const { name, teacherId, questions, studentIds } = createQuizInput

        const teacher = await this.studentService.getStudent(teacherId)
        const isReallyTeacher = (teacher != null) ? teacher.isTeacher : false
        const studentsExists = (await this.studentService.getManyStudents(studentIds)).length === studentIds.length

        const questionsCorrect = createQuizInput.questions.filter((question) => {
            const isCorrect = QuestionService.checkQuestionIsCorrect(question.type, question.answers)
            return isCorrect
        }).length === questions.length

        if (isReallyTeacher && studentsExists && questionsCorrect) {
            const quizId = uuid()
            const questionEntities: Question[] = []

            for await (const question of questions) {
                question.quizId = quizId
                let questionEntity = await this.questionService.createQuestion(question)
                questionEntities.push(questionEntity)
            }

            const quiz = this.quizRepository.create({
                id: quizId,
                name,
                teacherId,
                studentIds,
                questionIds: questionEntities.map(question => question.id)
            })

            await this.quizRepository.save(quiz)

            return this.createQuizDto(quiz.id, quiz.name, teacher, questionEntities)
        } else {
            switch (true) {
                case !isReallyTeacher: throw new HttpException("Please provide a teacher.", 400)
                case !studentsExists: throw new HttpException("Please provide existing students who are not teachers.", 400)
                case !questionsCorrect: throw new HttpException("Please provide questions with correct answers.", 400)
            }
        }

    }

    async getQuiz(quizId: ID, studentId: ID): Promise<QuizDto> {
        const quiz = await this.quizRepository.findOneBy({ id: quizId })
        if (quiz == null) throw new HttpException("Quiz not found.", 404)

        const teacher = await this.studentService.getStudent(quiz.teacherId)
        const isAllowed = [...quiz.studentIds, teacher.id].includes(studentId)
        if (!isAllowed) throw new HttpException("Student is not allowed to view questions for this quiz.", 401)
        
        const questions = await this.questionService.getQuestionsForQuiz(quizId)

        return await this.createQuizDto(quiz.id, quiz.name, teacher, questions)
    }

    private async createQuizDto(quizId: ID, quizName: string, teacher: Student, questions: Question[]): Promise<QuizDto> {
        const questionsDto: QuestionDto[] = []
        for (const question of questions) {
            const answers: TeacherAnswerDto[] = (await this.teacherAnswerService.getTeacherAnswersForQuestion(question.id)).map(answer => {
                return {
                    id: answer.id,
                    answer: answer.answer,
                    isCorrect: answer.isCorrect
                }
            })
            const questionDto: QuestionDto = {
                id: question.id,
                question: question.question,
                type: question.type,
                answers: answers
            }

            questionsDto.push(questionDto)
            
        }
        
        const quizDto: QuizDto = {
            id: quizId,
            name: quizName,
            teacher: teacher,
            questions: questionsDto
        }

        return quizDto
    }
}