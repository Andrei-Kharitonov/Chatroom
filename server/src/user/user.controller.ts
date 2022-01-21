import { Body, Controller, Get, Put, Post, Query, Patch, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { SecurityUser } from './schemas/security-user.schemas';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/get-all')
  getAll(): Promise<SecurityUser[] | null> {
    return this.userService.getAll()
  }

  @Get('/get-by-login')
  getByLogin(@Query() user: Record<string, any>): Promise<User | null> {
    return this.userService.getByLogin(user.login, user.password);
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return this.userService.create(createUserDto);
  }

  @Put('/update')
  updateUser(@Query() user: Record<string, any>, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userService.update(user.login, user.password, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string, @Query() user: Record<string, any>): Promise<User> {
    return this.userService.remove(id, user.login, user.password);
  }
}