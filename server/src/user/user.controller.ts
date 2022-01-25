import { Body, Controller, Get, Put, Post, Query, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { SecurityUser } from './schemas/security-user.schemas';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/get-all')
  getAll(): Promise<SecurityUser[] | []> {
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

  @Put('/ban/:id')
  ban(@Param('id') id: string, @Query() user: Record<string, any>): Promise<SecurityUser | null> {
    return this.userService.setBan(id, user.login, user.password);
  }

  @Put('/set-moderator/:id')
  setModerator(@Param('id') id: string, @Query() user: Record<string, any>): Promise<SecurityUser | null> {
    return this.userService.setModerator(id, user.login, user.password);
  }


  @Put('/transfer-admin/:id')
  transferAdmin(@Param('id') id: string, @Query() user: Record<string, any>): Promise<SecurityUser | null> {
    return this.userService.setModerator(id, user.login, user.password);
  }

  @Delete('/delete/:id')
  removeUser(@Param('id') id: string, @Query() user: Record<string, any>): Promise<User | null> {
    return this.userService.removeUser(id, user.login, user.password);
  }

  @Delete('/delete-account')
  removeAccount(@Query() user: Record<string, any>): Promise<User | null> {
    return this.userService.removeAccount(user.id, user.login, user.password);
  }
}