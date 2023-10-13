import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { TeacherResolver } from './teacher.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Teacher])
    ],
    providers: [TeacherResolver, TeacherService],
    exports: [TeacherService]
})
export class TeacherModule {}
