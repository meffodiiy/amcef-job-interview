import { Todo } from '@prisma/client'
import { IsDateString, IsNumber, IsString } from 'class-validator'

export class CreateTodoDto implements Pick<Todo, 'title' | 'text' | 'deadline' | 'listId'> {

  @IsDateString()
    deadline: Date

  @IsString()
    text: string

  @IsString()
    title: string

  @IsNumber()
    listId: number

}
