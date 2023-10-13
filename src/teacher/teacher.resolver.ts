import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TeacherType } from "./teacher.type";
import { TeacherService } from "./teacher.service";
import { CreateTeacherInput } from "./create-teacher.input";

@Resolver(of => TeacherType)
export class TeacherResolver {
    constructor(
        private teacherService: TeacherService
    ) {}

    @Mutation(returns => TeacherType)
    async createTeacher(
        @Args('createTeacherInput') createTeacherInput: CreateTeacherInput
    ) {
        return this.teacherService.createTeacher(createTeacherInput)
    }

    @Query(returns => [TeacherType])
    async teachers() {
        return this.teacherService.getTeachers()
    }

    @Query(returns => TeacherType)
    async teacher(@Args('id') id: string) {
        return this.teacherService.getTeacher(id)
    }
}