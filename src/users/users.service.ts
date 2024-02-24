import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: createUserDto
    })
  }

  async existsByUsername(username: string): Promise<boolean> {
    return !!(await this.databaseService.user.findUnique({
      where: { username }
    }))
  }

  async findAll() {
    return 'This action returns all users'
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`
  }

  async findOneByUsername(username: string) {
    return this.databaseService.user.findUnique({
      where: { username }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
