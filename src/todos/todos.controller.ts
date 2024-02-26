import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpCode, HttpStatus, Req, ConflictException, InternalServerErrorException, ParseIntPipe, NotFoundException
} from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { RequestWithUser } from '../shared.type'
import { TodoListsService } from '../todo-lists/todo-lists.service'
import { SkipAuth } from '../auth/decorators/skip-auth.decorator'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ToDos')
@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly todoListsService: TodoListsService
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Req() req: RequestWithUser, @Body() createTodoDto: CreateTodoDto) {
    const { title, listId } = createTodoDto

    if (await this.todosService.existsByTitle(listId, title))
      throw new ConflictException(`ToDo with given title '${title}' already exists in this list.`)

    if (!(await this.todoListsService.belongsToUser(listId, req.user.id)))
      throw new ConflictException('Not allowed to create ToDos in this list.')

    try {
      await this.todosService.create(req.user.id, createTodoDto)
    } catch {
      throw new InternalServerErrorException('Failed to create ToDo.')
    }
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todosService.findOne(id)

    if (!todo)
      throw new NotFoundException('ToDo not found.')

    return todo
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      await this.todosService.update(id, updateTodoDto)
    } catch {
      throw new InternalServerErrorException('Failed to update ToDo.')
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.todosService.remove(id)
    } catch {
      throw new InternalServerErrorException('Failed to delete ToDo.')
    }
  }
}
