import { TodoList } from '@prisma/client'
import { IsString } from 'class-validator'

export class CreateTodoListDto implements Pick<TodoList, 'name'> {

  @IsString()
    name: string
}
