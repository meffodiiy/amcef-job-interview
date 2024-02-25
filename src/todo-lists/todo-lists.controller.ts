import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  ConflictException, ParseIntPipe
} from '@nestjs/common'
import { TodoListsService } from './todo-lists.service'
import { CreateTodoListDto } from './dto/create-todo-list.dto'
import { UpdateTodoListDto } from './dto/update-todo-list.dto'
import { RequestWithUser } from '../shared.type'
import { SkipAuth } from '../auth/decorators/skip-auth.decorator'
import { ShareTodoListDto } from './dto/share-todo-list.dto'

@Controller('todo-lists')
export class TodoListsController {
  constructor(private readonly todoListsService: TodoListsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createTodoListDto: CreateTodoListDto
  ) {
    const { name } = createTodoListDto

    if (await this.todoListsService.existsByName(name))
      throw new ConflictException(
        `ToDo list with given name '${name}' already exists.`
      )

    try {
      await this.todoListsService.create(req.user.id, createTodoListDto)
    } catch (error) {
      throw new InternalServerErrorException('Failed to create ToDo list.')
    }
  }

  @SkipAuth()
  @Get()
  async findAll() {
    return this.todoListsService.findAll()
  }

  @SkipAuth()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoListsService.findOne(id)
  }

  @Patch('share')
  async share(@Req() req: RequestWithUser, @Body() shareTodoListDto: ShareTodoListDto) {
    const { listId, userId } = shareTodoListDto

    if (!await this.todoListsService.belongsToUser(listId, req.user.id))
      throw new ConflictException('Not allowed to share this ToDo list.')

    try {
      await this.todoListsService.share(listId, userId)
    } catch {
      throw new InternalServerErrorException('Failed to share ToDo list.')
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoListDto: UpdateTodoListDto
  ) {
    try {
      await this.todoListsService.update(id, updateTodoListDto)
    } catch {
      throw new InternalServerErrorException('Failed to update ToDo list.')
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.todoListsService.remove(+id)
    } catch {
      throw new InternalServerErrorException('Failed to delete ToDo list.')
    }
  }
}
