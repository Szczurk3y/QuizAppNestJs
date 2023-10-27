import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { QuizDtoType } from "./quiz-dto.type";
import { QuizService } from "./quiz.service";
import { CreateQuizInput } from "./create-quiz.input";
import { QuestionService } from "src/question/question.service";
import { Quiz } from "../model/quiz.entity";
import { ID } from 'graphql-ws';

@Resolver(of => QuizDtoType)
export class QuizResolver {
    constructor(
        private quizService: QuizService,
        private questionService: QuestionService
    ) {}

    @Mutation(returns => QuizDtoType)
    async createQuiz(
        @Args('createQuizInput') createQuizInput: CreateQuizInput
    ) {
        return this.quizService.createQuiz(createQuizInput)
    }

    @Query(returns => QuizDtoType)
    async quiz(
        @Args('quizId') quizId: ID,
        @Args('studentId') studentId: ID
    ) {
        return this.quizService.getQuiz(quizId, studentId)
    }

    @ResolveField()
    async questions(@Parent() quiz: Quiz) {
        return this.questionService.getQuestionsForQuiz(quiz.id)
    }
}