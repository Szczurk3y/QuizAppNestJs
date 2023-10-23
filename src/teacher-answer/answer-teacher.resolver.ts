import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TeacherAnswerType } from "./answer-teacher.type";
import { TeacherAnswerService } from "./answer-teacher.service";
import { CreateAnswerTeacherInput } from "./answer-teacher.input";
import { StudentAnswerType } from "src/student-answer/answer-student.type";
import { StudentAnswer } from "src/student-answer/answer-student.entity";

@Resolver(of => [TeacherAnswerType])
export class TeacherAnswerResolver {
    constructor(
        private answerService: TeacherAnswerService
    ) {}

    @Mutation(returns => TeacherAnswerType)
    async createTeacherAnswer(
        @Args('createTeacherAnswerInput') createTeacherAnswerInput: CreateAnswerTeacherInput
    ) {
        return this.answerService.createAnswer(createTeacherAnswerInput)
    }

    @Query(returns => [TeacherAnswerType])
    async teacherAnswers() {
        return this.answerService.getAnswers()
    }

    @Query(returns => TeacherAnswerType)
    async teacherAnswer(@Args('teacherId') teacherId: string) {
        return this.answerService.getAnswer(teacherId)
    }
}