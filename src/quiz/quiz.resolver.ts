import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { QuizType } from "./quiz.type";
import { QuizService } from "./quiz.service";
import { CreateQuizInput } from "./create-quiz.input";
import { QuestionService } from "src/question/question.service";
import { Quiz } from "./quiz.entity";
import { StudentService } from "src/student/student.service";

@Resolver(of => QuizType)
export class QuizResolver {
    constructor(
        private quizService: QuizService,
        private questionService: QuestionService,
        private studentService: StudentService
    ) {}

    @Mutation(returns => QuizType)
    async createQuiz(
        @Args('createQuizInput') createQuizInput: CreateQuizInput
    ) {
        return this.quizService.createQuiz(createQuizInput)
    }

    @Query(returns => [QuizType])
    async quizzes() {
        return this.quizService.getQuizzes()
    }

    @Query(returns => QuizType)
    async quiz(@Args('id') id: string) {
        return this.quizService.getQuiz(id)
    }

    @ResolveField()
    async questions(@Parent() quiz: Quiz) {
        return this.questionService.getQuestionsForQuiz(quiz.id, quiz.teacherId)
    }

    @ResolveField()
    async students(@Parent() quiz: Quiz) {
        return this.studentService.getManyStudents(quiz.studentIds)
    }

    @ResolveField()
    async teacher(@Parent() quiz: Quiz) {
        return this.studentService.getStudent(quiz.teacherId)
    }
}