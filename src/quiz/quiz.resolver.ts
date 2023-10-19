import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { QuizType } from "./quiz.type";
import { QuizService } from "./quiz.service";
import { CreateQuizInput } from "./create-quiz.input";
import { QuestionService } from "src/question/question.service";
import { Question } from "src/question/question.entity";
import { Quiz } from "./quiz.entity";

@Resolver(of => QuizType)
export class QuizResolver {
    constructor(
        private quizService: QuizService,
        private questionService: QuestionService
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
        return this.questionService.getQuestionsForQuiz(quiz.id)
    }
}