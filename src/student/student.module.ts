import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentController } from './student.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Student])
    ],
    controllers: [StudentController],
    providers: [StudentResolver, StudentService],
    exports: [StudentService]
})
export class StudentModule {}
