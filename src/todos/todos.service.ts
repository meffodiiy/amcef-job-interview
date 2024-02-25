import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { DatabaseService } from '../database/database.service'
import { Todo, TodoList, TodoStatus, User } from '@prisma/client'
import { exclude } from '../utils/exclude.util'

@Injectable()
export class TodosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(authorId: User['id'], createTodoDto: CreateTodoDto) {
    return this.databaseService.todo.create({
      data: {
        ...createTodoDto,
        authorId,
        status: TodoStatus.ACTIVE
      }
    })
  }

  async findOne(id: Todo['id']) {
    const todo = await this.databaseService.todo.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    return exclude(todo, ['createdAt', 'updatedAt', 'authorId'])
  }

  async existsByTitle(todoListId: TodoList['id'], title: Todo['title']) {
    return !!(await this.databaseService.todo.findUnique({
      where: { listId: todoListId, title }
    }))
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.databaseService.todo.update({
      where: { id },
      data: updateTodoDto
    })
  }

  async remove(id: number) {
    return this.databaseService.todo.delete({
      where: { id }
    })
  }
}
