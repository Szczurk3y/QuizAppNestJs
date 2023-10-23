import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TeacherAnswerService } from "./answer-teacher.service";
import { CreateTeacherAnswerInput } from "./answer-teacher.input";

@Controller('teacher-answer')
export class TeacherAnswerController {
    constructor(private readonly teacherAnswerService: TeacherAnswerService) {}

    @Post()
    create(@Body() createTeacherAnswerInput: CreateTeacherAnswerInput) {
        return this.teacherAnswerService.createTeacherAnswer(createTeacherAnswerInput)
    }

    @Get()
    getAll() {
        return this.teacherAnswerService.getTeacherAnswers()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.teacherAnswerService.getTeacherAnswer(id)
    }

    @Get(':questionId')
    teacherAnswersForQuestion(@Param('questionId') questionId: string) {
        return this.teacherAnswerService.getTeacherAnswersForQuestion(questionId)
    }
}