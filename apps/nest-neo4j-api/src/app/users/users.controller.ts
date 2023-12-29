import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    Logger.log('Creating user...', {
      createUserDto,
      context: UsersController.name,
    });
    return this.usersService.create(
      createUserDto.email,
      createUserDto.password
    );
  }

  @Get()
  async findAll(properties: Record<string, unknown> = {}) {
    return this.usersService.findAll(properties);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
