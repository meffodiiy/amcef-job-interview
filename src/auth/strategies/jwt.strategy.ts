import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { JWT_SECRET } from '../../constants'
import { JwtStrategyPayload } from '../types/jwt-strategy-payload.type'
import { UsersService } from '../../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    })
  }

  async validate(payload: JwtStrategyPayload) {
    return this.usersService.findOne(payload.userId)
  }
}
