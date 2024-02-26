import { TodoList } from '@prisma/client'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoListDto implements Pick<TodoList, 'name'> {

  @ApiProperty({
    example: 'Capybara Stuff',
    required: true
  })
  @IsString()
    name: string
}
