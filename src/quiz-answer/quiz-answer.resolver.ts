import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuizAnswerType } from "./quiz-answer.type";
import { QuizAnswerInput } from "./quiz-answer.input";
import { AnswerQuizService } from "./quiz-answer.service";
import { QuizAnswer } from "./quiz-answer.entity";
import { StudentAnswerService } from "src/student-answer/answer-student.service";

@Resolver(of => QuizAnswerType)
export class QuizAnswerResolver {
    constructor(
        private answerQuizService: AnswerQuizService,
        private studentAnswerService: StudentAnswerService
    ) {}

    @Mutation(returns => QuizAnswerType)
    async submitQuizAnswers(
        @Args('createQuizAnswerInput') createQuizAnswerInput: QuizAnswerInput,
    ) {
        return this.answerQuizService.submitQuizAnswers(createQuizAnswerInput)
    }

    @ResolveField()
    async studentAnswerIds(@Parent() quizAnswer: QuizAnswer) {
        return this.studentAnswerService.getStudentAnswers(quizAnswer.studentAnswerIds)
    }
} 