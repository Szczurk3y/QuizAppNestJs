import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { QuestionType } from "./question.type";
import { QuestionService } from "./question.service";
import { CreateQuestionInput } from "./question.input";

@Resolver(of => QuestionType)
export class QuestionResolver {
    constructor(
        private questionService: QuestionService
    ) {}

    @Mutation(returns => QuestionType)
    async createQuestion(
        @Args('createQuestionInput') createQuestionInput: CreateQuestionInput
    ) {
        return this.questionService.createQuestion(createQuestionInput)
    }
 
    @Query(returns => [QuestionType])
    async questions() {
        return this.questionService.getQuestions()
    }

    @Query(returns => QuestionType)
    async question(@Args('id') id: string) {
        return this.questionService.getQuestion(id)
    }

    @Query(returns => [QuestionType])
    async questionsForQuiz(@Args('quizId') quizId: string, @Args('studentId') studentId: string) {
        return this.questionService.getQuestionsForQuiz(quizId, studentId)
    }
}