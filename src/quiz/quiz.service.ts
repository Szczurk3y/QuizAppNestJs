import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "./quiz.entity";
import { MongoRepository } from "typeorm";
import { CreateQuizInput } from "./create-quiz.input";
import { v4 as uuid } from 'uuid'
import { QuestionService } from "src/question/question.service";
import { StudentService } from "src/student/student.service";
import { ID } from 'graphql-ws';

@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz) private quizRepository: MongoRepository<Quiz>,
        private questionService: QuestionService,
        private studentService: StudentService
    ) { }


    async createQuiz(createQuizInput: CreateQuizInput): Promise<Quiz> {
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
            const questionIds: ID[] = []

            for await (const question of questions) {
                question.quizId = quizId
                let _question = await this.questionService.createQuestion(question)
                questionIds.push(_question.id)
            }

            const quiz = this.quizRepository.create({
                id: quizId,
                name,
                teacherId,
                studentIds,
                questionIds: questionIds
            })
            return this.quizRepository.save(quiz)
        } else {
            switch (true) {
                case !isReallyTeacher: throw new HttpException("Please provide a teacher.", 400)
                case !studentsExists: throw new HttpException("Please provide existing students who are not teachers.", 400)
                case !questionsCorrect: throw new HttpException("Please provide questions with correct answers.", 400)
            }
        }

    }

    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find()
    }

    async getQuiz(quizId: ID, studentId: ID): Promise<Quiz> {
        const quiz = await this.quizRepository.findOneBy({ id: quizId })
        const isAllowed = [...quiz.studentIds, quiz.teacherId].includes(studentId)

        switch (true) {
            case quiz == null: throw new HttpException("Quiz not found.", 404)
            case !isAllowed: throw new HttpException("Student is not allowed to view questions for this quiz.", 401)
            default: return await this.quizRepository.findOneBy({ id: quizId })
        }
    }
}