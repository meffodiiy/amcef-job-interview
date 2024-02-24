import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/users.service'
import { DatabaseService } from '../database/database.service'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET, JWT_TOKEN_LIFETIME } from '../constants'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_TOKEN_LIFETIME
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, DatabaseService, JwtStrategy]
})
export class AuthModule {}
