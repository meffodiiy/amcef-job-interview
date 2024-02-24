import { User } from '@prisma/client'

export class CredentialsDto implements Pick<User, 'username' | 'password'> {
  password: string
  username: string
}
