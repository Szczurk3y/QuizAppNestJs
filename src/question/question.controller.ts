import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { CreateQuestionInput } from "./question.input";

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    create(@Body() createQuestionInput: CreateQuestionInput) {
        return this.questionService.createQuestion(createQuestionInput)
    }

    @Get()
    getAll() {
        return this.questionService.getQuestions()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.questionService.getQuestion(id)
    }
}