import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AnswerQuizService } from "./quiz-answer.service";
import { AnswerQuizInput } from "./quiz-answer.input";

@Controller('answer-quiz')
export class AnswerQuizController {
    constructor(private readonly answerQuizService: AnswerQuizService) {}

    @Post()
    create(@Body() createAnswerQuiz: AnswerQuizInput) {
        return this.answerQuizService.submitAnswersForQuiz(createAnswerQuiz)
    }

    @Get(':id')
    getQuizAnswerForStudent(
        @Param(':id') quizAnswerId
    ) {
        return this.answerQuizService.getQuizAnswerForStudent(quizAnswerId)
    }

    @Get(':quizId/:studentId')
    getStudentAnswerQuizAnswer(
        @Param(':quizId') quizId,
        @Param(':studentId') studentId
    ) {
        return this.answerQuizService.getAnswersForQuizAnswer(quizId, studentId)
    }
}