import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_METADATA_KEY } from '../decorators/skip-auth.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const skipsAuth = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_METADATA_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (skipsAuth) return true

    return super.canActivate(context)
  }
}
