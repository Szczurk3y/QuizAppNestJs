import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuizInput } from "./create-quiz.input";

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post()
    create(@Body() createQuizInput: CreateQuizInput) {
        return this.quizService.createQuiz(createQuizInput)
    }

    @Get(':quizId/:studentId')
    findOne(@Param('quizId') quizId: string, @Param('studentId') studentId: string) {
        return this.quizService.getQuiz(quizId, studentId)
    }
}