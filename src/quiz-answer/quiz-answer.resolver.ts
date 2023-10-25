import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { QuizAnswerType } from "./quiz-answer.type";
import { QuizAnswerInput } from "./quiz-answer.input";
import { AnswerQuizService } from "./quiz-answer.service";
import { StudentService } from "src/student/student.service";

@Resolver(of => QuizAnswerType)
export class QuizAnswerResolver {
    constructor(
        private answerQuizService: AnswerQuizService,
        private studentService: StudentService
    ) {}

    @Mutation(returns => QuizAnswerType)
    async submitQuizAnswers(
        @Args('createQuizAnswerInput') createQuizAnswerInput: QuizAnswerInput,
    ) {
        return this.answerQuizService.submitQuizAnswers(createQuizAnswerInput)
    }
} 