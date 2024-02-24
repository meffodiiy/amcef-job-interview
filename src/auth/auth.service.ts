import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { BCRYPT_COST_FACTOR } from '../constants'
import { CredentialsDto } from './dto/credentials.dto'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private generateAccessToken(user: User) {
    return this.jwtService.sign({
      sub: user.id,
      username: user.username
    })
  }

  comparePasswords(raw: string, encrypted: string) {
    return bcrypt.compareSync(raw, encrypted)
  }

  async signUp(credentialsDto: CredentialsDto) {
    const user = await this.usersService.create({
      ...credentialsDto,
      password: bcrypt.hashSync(credentialsDto.password, BCRYPT_COST_FACTOR)
    })

    return {
      accessToken: this.generateAccessToken(user)
    }
  }

  async logIn(credentialsDto: CredentialsDto) {
    const user = await this.usersService.findOneByUsername(
      credentialsDto.username
    )

    if (!this.comparePasswords(credentialsDto.password, user.password))
      throw new UnauthorizedException('Invalid password.')

    return {
      accessToken: this.generateAccessToken(user)
    }
  }
}
