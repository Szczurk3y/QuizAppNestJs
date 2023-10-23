import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { QuizAnswerType } from "./quiz-answer.type";
import { AnswerQuizInput } from "./quiz-answer.input";
import { AnswerQuizService } from "./quiz-answer.service";
import { StudentAnswerType } from "src/student-answer/answer-student.type";

@Resolver(of => [QuizAnswerType, StudentAnswerType])
export class QuizAnswerResolver {
    constructor(
        private answerQuizService: AnswerQuizService
    ) {}

    @Mutation(returns => QuizAnswerType)
    async createQuizAnswer(
        @Args('createQuizInput') createQuizInput: AnswerQuizInput,
    ) {
        return this.answerQuizService.submitAnswersForQuiz(createQuizInput)
    }

    @Query(returns => QuizAnswerType)
    async quizAnswerForStudent(
        @Args('quizAnswerId') quizAnswerId: string
    ) {
        return this.answerQuizService.getQuizAnswerForStudent(quizAnswerId)
    }
        
    @Query(returns => [StudentAnswerType])
    async studentAnswerQuizAnswers(
        @Args('quizId') quizId: string,
        @Args('studentId') studentId: string
    ) {
        return this.answerQuizService.getAnswersForQuizAnswer(quizId, studentId)
    }
} 