import { Resolver } from "@nestjs/graphql";
import { StudentAnswerType } from "./answer-student.type";
import { StudentAnswerService } from "./answer-student.service";

@Resolver(of => StudentAnswerType)
export class StudentAnswerResolver {
    constructor() {}
}