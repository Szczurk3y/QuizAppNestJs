import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { MongoRepository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: MongoRepository<Student>
    ) {}

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName, isTeacher } = createStudentInput
        const teacher = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
            isTeacher
        })

        return this.studentRepository.save(teacher)
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find()
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOneBy({ id })
    }

    // TODO: implement quiz to each teacher
}