import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { DatabaseService } from '../database/database.service'
import { TodoListsService } from '../todo-lists/todo-lists.service'

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodoListsService, DatabaseService]
})
export class TodosModule {}
