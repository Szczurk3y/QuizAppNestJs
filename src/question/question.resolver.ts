import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestionType } from "./question.type";
import { QuestionService } from "./question.service";
import { CreateQuestionInput } from "./question.input";
import { Question } from "./question.entity";
import { AnswerService } from "src/answer/answer.service";

@Resolver(of => QuestionType)
export class QuestionResolver {
    constructor(
        private questionService: QuestionService,
        private answerService: AnswerService
    ) { }

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

    @ResolveField()
    async answers(@Parent() question: Question) {
        return this.answerService.getAnswersForQuestion(question.id)
    }
}