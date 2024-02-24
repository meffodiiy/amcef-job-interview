import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { CredentialsDto } from './dto/credentials.dto'
import { SkipAuth } from './decorators/skip-auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() credentialsDto: CredentialsDto) {
    const { username } = credentialsDto

    if (await this.usersService.existsByUsername(username))
      throw new ConflictException(`Username '${username}' already taken.`)

    return this.authService.signUp(credentialsDto)
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() credentialsDto: CredentialsDto) {
    const { username } = credentialsDto

    if (!(await this.usersService.existsByUsername(username)))
      throw new NotFoundException(
        `User with given username '${username}' not found.`
      )

    return this.authService.logIn(credentialsDto)
  }
}
