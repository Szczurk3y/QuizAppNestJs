import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Quiz } from "./quiz.entity";
import { MongoRepository } from "typeorm";
import { CreateQuizInput } from "./create-quiz.input";
import { v4 as uuid } from 'uuid'
import { QuestionService } from "src/question/question.service";
import { StudentService } from "src/student/student.service";


@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz) private quizRepository: MongoRepository<Quiz>,
        private questionService: QuestionService,
        private studentService: StudentService
    ) {}


    async createQuiz(createQuizInput: CreateQuizInput): Promise<Quiz> {
        const { name, teacherId, questions, studentIds } = createQuizInput
        const isReallyTeacher = await this.studentService.isTeacher(teacherId)
        const studentsExists = (await this.studentService.getManyStudents(studentIds)).length == studentIds.length
        if (isReallyTeacher && studentsExists) {
            const quizId = uuid()
            for await (const question of questions) {
                question.quizId = quizId
                this.questionService.createQuestion(question)
            }
            const quiz = this.quizRepository.create({
                id: quizId,
                name,
                teacherId,
                studentIds
            })
            return this.quizRepository.save(quiz)
        } else {
            switch(true) {
                case !isReallyTeacher: {
                    throw Error("Please provide a teacher")
                }
                case !studentsExists: {
                    throw Error("Please provide existing students who are not teachers")
                }
                default: {
                    throw Error("Unknown error")
                }
            }
        }
        
    }
    
    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find()
    }

    async getQuiz(id: string): Promise<Quiz> {
        return this.quizRepository.findOneBy( { id })
    }
}