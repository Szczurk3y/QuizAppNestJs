import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { QuizAnswerType } from "./quiz-answer.type";
import { QuizAnswerInput } from "./quiz-answer.input";
import { QuizAnswerService } from "./quiz-answer.service";
import { StudentAnswerType } from "src/student-answer/answer-student.type";

@Resolver(of => [QuizAnswerType, StudentAnswerType])
export class QuizAnswerResolver {
    constructor(
        private quizAnswerService: QuizAnswerService
    ) {}

    @Mutation(returns => QuizAnswerType)
    async createQuizAnswer(
        @Args('createQuizInput') createQuizInput: QuizAnswerInput,
    ) {
        return this.quizAnswerService.submitAnswersForQuiz(createQuizInput)
    }

    @Query(returns => QuizAnswerType)
    async quizAnswerForStudent(
        @Args('studentId') studentId: string,
        @Args('quizId') quizId: string
    ) {
        return this.quizAnswerService.getQuizAnswerForStudent(studentId, quizId)
    }
        
    @Query(returns => [StudentAnswerType])
    async studentAnswers(
        @Args('quizId') quizId: string,
        @Args('studentId') studentId: string
    ) {
        return this.quizAnswerService.getAnswersForQuizAnswer(quizId, studentId)
    }
} 