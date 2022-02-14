import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('index')
  home() { }

  @Get('/favicon.ico')
  favicon(@Res() res) {
    return res.sendFile('favicon.ico', { root: './static' })
  }

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
