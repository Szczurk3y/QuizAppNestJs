import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentAnswerType } from "./answer-student.type";
import { StudentAnswerService } from "./answer-student.service";

@Resolver(of => StudentAnswerType)
export class StudentAnswerResolver {
    constructor(
        private studentAnswerService: StudentAnswerService
    ) { }

    @Query(returns => [StudentAnswerType])
    async studentAnswerIds() {
        return this.studentAnswerService.getAllAnswers()
    }
}