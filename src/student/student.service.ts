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

    async getManyStudents(ids: string[]) {
        const foundStudents = await this.studentRepository.find({
            where: {
                id: {
                    $in: ids
                },
                isTeacher: false
            }
        })
        return foundStudents
    }

    async isTeacher(id: string): Promise<boolean> {
        const foundStudent = await this.getStudent(id)
        return (foundStudent != null) ? foundStudent.isTeacher : false
    }
}