import { User } from '@prisma/client'
import { IsString, IsStrongPassword } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto implements Pick<User, 'username' | 'password'> {

  @ApiProperty({
    example: 'amcef',
    required: true
  })
  @IsString()
    username: string

  @ApiProperty({
    example: 'Granko_424242',
    required: true
  })
  @IsStrongPassword()
    password: string

}
