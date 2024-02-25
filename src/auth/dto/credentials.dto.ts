import { User } from '@prisma/client'
import { IsString, IsStrongPassword } from 'class-validator'

export class CredentialsDto implements Pick<User, 'username' | 'password'> {

  @IsStrongPassword()
    password: string

  @IsString()
    username: string

}
