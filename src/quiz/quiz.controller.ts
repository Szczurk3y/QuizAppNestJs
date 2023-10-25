import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuizInput } from "./create-quiz.input";
import { ID } from 'graphql-ws';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post()
    create(@Body() createQuizInput: CreateQuizInput) {
        return this.quizService.createQuiz(createQuizInput)
    }

    @Get()
    findOne(@Query('quizId') quizId: ID, @Query('studentId') studentId: ID) {
        return this.quizService.getQuiz(quizId, studentId)
    }
}