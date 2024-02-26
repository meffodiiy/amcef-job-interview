import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateTodoDto } from './create-todo.dto'
import { Todo, TodoStatus } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

  @ApiProperty({
    example: 'ACTIVE|DONE|CANCELED',
    required: false
  })
  @IsEnum(TodoStatus)
    status?: Todo['status']

}
