import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TeacherAnswerType } from "./answer-teacher.type";
import { TeacherAnswerService } from "./answer-teacher.service";
import { CreateTeacherAnswerInput } from "./answer-teacher.input";
import { StudentAnswerType } from "src/student-answer/answer-student.type";
import { StudentAnswer } from "src/student-answer/answer-student.entity";
import { TeacherAnswer } from "./answer-teacher.entity";

@Resolver(of => [TeacherAnswerType])
export class TeacherAnswerResolver {
    constructor(
        private answerService: TeacherAnswerService
    ) {}

    @Mutation(returns => TeacherAnswerType)
    async createTeacherAnswer(
        @Args('createTeacherAnswerInput') createTeacherAnswerInput: CreateTeacherAnswerInput
    ) {
        return this.answerService.createTeacherAnswer(createTeacherAnswerInput)
    }

    @Query(returns => [TeacherAnswerType])
    async teacherAnswers() {
        return this.answerService.getTeacherAnswers()
    }

    @Query(returns => TeacherAnswerType)
    async teacherAnswer(@Args('teacherId') teacherId: string) {
        return this.answerService.getTeacherAnswer(teacherId)
    }

    @Query(returns => [TeacherAnswerType])
    async teacherAnswersForQuestion(@Args('questionId') questionsId: string) {
        return this.answerService.getTeacherAnswersForQuestion(questionsId)
    }
}