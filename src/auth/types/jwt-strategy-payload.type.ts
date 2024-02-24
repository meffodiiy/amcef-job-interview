import { User } from '@prisma/client'

export type JwtStrategyPayload = {
  userId: User['id']
}
