import { User } from '@prisma/client'

export class CreateUserDto implements Pick<User, 'username' | 'password'> {
  username: string
  password: string
}
