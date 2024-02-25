import { Injectable } from '@nestjs/common'
import { CreateTodoListDto } from './dto/create-todo-list.dto'
import { UpdateTodoListDto } from './dto/update-todo-list.dto'
import { DatabaseService } from '../database/database.service'
import { Todo, TodoList, User } from '@prisma/client'
import { exclude } from '../utils/exclude.util'

@Injectable()
export class TodoListsService {
  constructor(private readonly databaseService: DatabaseService) {}


  private static readonly TODO_LIST_INCLUDE = {
    todos: {
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    }
  }

  private cleanToDoList (rawTodoList: TodoList & { todos: Todo[] }) {
    const todoList = exclude(rawTodoList, ['createdAt', 'updatedAt'])
    const todos = todoList.todos.map(todo => exclude(todo, ['createdAt', 'updatedAt', 'authorId']))
    return {
      ...todoList,
      todos
    }
  }

  async create(userId: User['id'], createTodoListDto: CreateTodoListDto) {
    return this.databaseService.todoList.create({
      data: {
        ...createTodoListDto,
        users: {
          create: {
            user: {
              connect: { id: userId }
            }
          }
        }
      }
    })
  }

  async findAll() {
    const rawTodoLists = await this.databaseService.todoList.findMany({
      include: TodoListsService.TODO_LIST_INCLUDE
    })
    return rawTodoLists.map(todoList => this.cleanToDoList(todoList))
  }

  async findOne(id: TodoList['id']) {
    const rawTodoList = await this.databaseService.todoList.findUnique({
      where: { id },
      include: TodoListsService.TODO_LIST_INCLUDE
    })

    if (!rawTodoList) return

    return this.cleanToDoList(rawTodoList)
  }

  async existsByName(name: string) {
    return !!(await this.databaseService.todoList.findUnique({
      where: { name }
    }))
  }

  async belongsToUser(todoListsId: TodoList['id'], userId: User['id']) {
    return !!(await this.databaseService.todoList.findUnique({
      where: {
        id: todoListsId,
        users: {
          some: { userId }
        }
      }
    }))
  }

  async update(id: number, updateTodoListDto: UpdateTodoListDto) {
    return this.databaseService.todoList.update({
      where: { id },
      data: updateTodoListDto
    })
  }

  async share(listId: TodoList['id'], userId: User['id']) {
    return this.databaseService.todoList.update({
      where: { id: listId },
      data: {
        users: {
          create: {
            user: {
              connect: { id: userId }
            }
          }
        }
      }
    })
  }

  async remove(id: number) {
    return this.databaseService.todoList.delete({
      where: { id }
    })
  }
}
