import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
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

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id }
    })
  }

  async findOneByUsername(username: string) {
    return this.databaseService.user.findUnique({
      where: { username }
    })
  }
}
