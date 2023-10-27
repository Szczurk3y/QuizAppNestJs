import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../model/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
import { ID } from 'graphql-ws';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) { }

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

    async getStudent(id: ID): Promise<Student> {
        return this.studentRepository.findOneBy({ id })
    }

    async getManyStudents(studentIds: ID[]) {
        const foundStudents = await this.studentRepository
            .createQueryBuilder("student")
            .where("student.id IN (:...ids)", { ids: studentIds})
            .getMany()
            
        return foundStudents
    }

    async isTeacher(id: ID): Promise<boolean> {
        const foundStudent = await this.getStudent(id)
        return (foundStudent != null) ? foundStudent.isTeacher : false
    }
}