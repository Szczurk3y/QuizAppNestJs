import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestionType } from "./question.type";
import { Question } from "./question.entity";
import { TeacherAnswerService } from "src/teacher-answer/answer-teacher.service";

@Resolver(of => QuestionType)
export class QuestionResolver {
    constructor(
        private answerService: TeacherAnswerService
    ) { }

    @ResolveField()
    async answerIds(@Parent() question: Question) {
        return this.answerService.getTeacherAnswersForQuestion(question.id)
    }
}