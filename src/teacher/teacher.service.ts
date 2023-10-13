import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { MongoRepository } from 'typeorm';
import { CreateTeacherInput } from './create-teacher.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeacherService {

    constructor(
        @InjectRepository(Teacher) private teacherRepository: MongoRepository<Teacher>
    ) {}

    async createTeacher(createTeacherInput: CreateTeacherInput): Promise<Teacher> {
        const { firstName, lastName } = createTeacherInput
        const teacher = this.teacherRepository.create({
            id: uuid(),
            firstName,
            lastName
        })

        return this.teacherRepository.save(teacher)
    }

    async getTeachers(): Promise<Teacher[]> {
        return this.teacherRepository.find()
    }

    async getTeacher(id: string): Promise<Teacher> {
        return this.teacherRepository.findOneBy({ id })
    }

    // TODO: implement quiz to each teacher
}