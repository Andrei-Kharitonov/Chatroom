import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  home() { }

  @Get('/sign-up')
  @Render('sign-up')
  signUp() { }

  @Get('/sign-in')
  @Render('sign-in')
  signIn() { }

  @Get('/profile')
  @Render('profile')
  profile() { }

  @Get('/help')
  @Render('help')
  help() { }
}
