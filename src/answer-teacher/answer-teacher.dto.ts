import { ID } from 'graphql-ws';

export class TeacherAnswerDto {
    
    id: ID
    answer: string
    isCorrect: boolean = false
}