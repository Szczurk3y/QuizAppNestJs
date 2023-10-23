import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentInput } from "./create-student.input";

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post()
    create(@Body() createStudentInput: CreateStudentInput) {
        return this.studentService.createStudent(createStudentInput)
    }

    @Get()
    getAll() {
        return this.studentService.getStudents()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentService.getStudent(id)
    }
}