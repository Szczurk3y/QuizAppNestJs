import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentAnswer } from "./answer-student.entity";
import { StudentAnswerService } from "./answer-student.service";
import { StudentAnswerResolver } from "./answer-student.resolver";


@Module({
    imports: [TypeOrmModule.forFeature([StudentAnswer])],
    providers: [StudentAnswerResolver, StudentAnswerService],
    exports: [StudentAnswerService]

})
export class StudentAnswerModule {}