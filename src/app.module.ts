import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { TodosModule } from './todos/todos.module'
import { TodoListsModule } from './todo-lists/todo-lists.module'

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    TodosModule,
    TodoListsModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
