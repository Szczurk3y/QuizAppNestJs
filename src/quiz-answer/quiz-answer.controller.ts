import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AnswerQuizService } from "./quiz-answer.service";
import { QuizAnswerInput } from "./quiz-answer.input";

@Controller('answer-quiz')
export class AnswerQuizController {
    constructor(private readonly answerQuizService: AnswerQuizService) {}

    @Post()
    create(@Body() createAnswerQuiz: QuizAnswerInput) {
        return this.answerQuizService.submitQuizAnswers(createAnswerQuiz)
    }
}