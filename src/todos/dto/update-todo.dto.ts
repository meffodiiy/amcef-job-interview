import { PartialType } from '@nestjs/swagger'
import { CreateTodoDto } from './create-todo.dto'
import { Todo, TodoStatus } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

  @IsEnum(TodoStatus)
    status?: Todo['status']

}
