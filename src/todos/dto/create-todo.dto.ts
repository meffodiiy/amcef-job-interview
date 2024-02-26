import { Todo } from '@prisma/client'
import { IsDateString, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoDto implements Pick<Todo, 'title' | 'text' | 'deadline' | 'listId'> {

  @ApiProperty({
    example: '2042-04-02T00:00:00.000Z',
    required: true
  })
  @IsDateString()
    deadline: Date

  @ApiProperty({
    example: 'We need to buy capybara!',
    required: true
  })
  @IsString()
    text: string

  @ApiProperty({
    example: 'Buy Capybara',
    required: true
  })
  @IsString()
    title: string

  @ApiProperty({
    example: '42',
    required: true
  })
  @IsNumber()
    listId: number

}
