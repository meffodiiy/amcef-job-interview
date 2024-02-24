import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
