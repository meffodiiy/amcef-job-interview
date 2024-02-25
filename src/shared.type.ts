import { Request } from 'express'
import { User } from '@prisma/client'

export type RequestWithUser = Omit<Request, 'user'> & {
  user: User
}
