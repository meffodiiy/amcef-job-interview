import { User } from '@prisma/client'

export type JwtStrategyPayload = {
  sub: User['id']
  username: User['username']
}
