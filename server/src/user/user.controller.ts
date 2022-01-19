import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { SecurityUser } from './schemas/security-user.schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/get-all')
  getAll(): Promise<SecurityUser[] | null> {
    return this.userService.getAll()
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return this.userService.create(createUserDto);
  }
}