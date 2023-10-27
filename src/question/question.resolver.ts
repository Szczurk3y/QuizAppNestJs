import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestionType } from "./question.type";
import { Question } from "../model/question.entity";
import { TeacherAnswerService } from "src/answer-teacher/answer-teacher.service";

@Resolver(of => QuestionType)
export class QuestionResolver {
    constructor(
        private answerService: TeacherAnswerService
    ) { }

    @ResolveField()
    async answers(@Parent() question: Question) {
        return this.answerService.getTeacherAnswersForQuestion(question.id)
    }
}