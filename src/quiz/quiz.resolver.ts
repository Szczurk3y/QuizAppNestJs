import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { QuizType } from "./quiz.type";
import { QuizService } from "./quiz.service";
import { CreateQuizInput } from "./create-quiz.input";

@Resolver(of => QuizType)
export class QuizResolver {
    constructor(
        private quizService: QuizService
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

    // TODO: add assign-questions-to-quiz.input.ts
    // TODO: add assigning questions to quiz
    // TODO: add resolve field of question
}