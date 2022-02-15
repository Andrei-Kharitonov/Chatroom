import { Body, Controller, Get, Put, Post, Query, Delete, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';
import { SecurityUser } from './schemas/security-user.schemas';
import { UpdateUserDto } from './dto/update-user.dto';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';

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

  @Get('/avatar/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files/avatars' });
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User | null> {
    return this.userService.create(createUserDto);
  }

  @Post('/upload-avatar')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './files/avatars',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  uploadAvatar(@Query() user: Record<string, any>, @UploadedFile() file: Express.Multer.File): Promise<User | null> {
    let response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return this.userService.uploadAvatar(user.login, user.password, user.lastAvatarPath, response.filename);
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
    return this.userService.transferAdmin(id, user.login, user.password);
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