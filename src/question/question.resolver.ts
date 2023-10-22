import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { QuestionType } from "./question.type";
import { QuestionService } from "./question.service";
import { CreateQuestionInput } from "./question.input";
import { QuizService } from "src/quiz/quiz.service";

@Resolver(of => QuestionType)
export class QuestionResolver {
    constructor(
        private questionSrvice: QuestionService
    ) {}

    @Mutation(returns => QuestionType)
    async createQuestion(
        @Args('createQuestionInput') createQuestionInput: CreateQuestionInput
    ) {
        return this.questionSrvice.createQuestion(createQuestionInput)
    }
 
    @Query(returns => [QuestionType])
    async questions() {
        return this.questionSrvice.getQuestions()
    }

    @Query(returns => QuestionType)
    async question(@Args('id') id: string) {
        return this.questionSrvice.getQuestion(id)
    }
}