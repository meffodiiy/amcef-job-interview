import { Module } from '@nestjs/common'
import { TodoListsService } from './todo-lists.service'
import { TodoListsController } from './todo-lists.controller'
import { DatabaseService } from '../database/database.service'

@Module({
  controllers: [TodoListsController],
  providers: [TodoListsService, DatabaseService]
})
export class TodoListsModule {}
