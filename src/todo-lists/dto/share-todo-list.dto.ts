import { TodoList, User } from '@prisma/client'
import { IsNumber } from 'class-validator'

export class ShareTodoListDto {

  @IsNumber()
    listId: TodoList['id']

  @IsNumber()
    userId: User['id']

}
