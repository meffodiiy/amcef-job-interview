import { TodoList, User } from '@prisma/client'
import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ShareTodoListDto {

  @ApiProperty({
    example: '42',
    required: true
  })
  @IsNumber()
    listId: TodoList['id']

  @ApiProperty({
    example: '424242',
    required: true
  })
  @IsNumber()
    userId: User['id']

}
