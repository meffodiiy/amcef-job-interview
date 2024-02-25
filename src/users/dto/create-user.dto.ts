import { User } from '@prisma/client'
import { IsString, IsStrongPassword } from 'class-validator'

export class CreateUserDto implements Pick<User, 'username' | 'password'> {

  @IsString()
    username: string

  @IsStrongPassword()
    password: string

}
