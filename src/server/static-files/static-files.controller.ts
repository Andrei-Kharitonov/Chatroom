import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class StaticFilesController {
  @Get('/favicon.ico')
  favicon(@Res() res) {
    return res.sendFile('favicon.ico', { root: './public' });
  }

  @Get('/manifest.json')
  manifest(@Res() res) {
    return res.sendFile('manifest.json', { root: './public' });
  }

  @Get('/sw.js')
  serviceWorker(@Res() res) {
    return res.sendFile('sw.js', { root: './public' });
  }

  @Get('/workbox-:hash.js')
  workbox(@Param('hash') hash: string, @Res() res) {
    return res.sendFile(`workbox-${hash}.js`, { root: './public' });
  }

  @Get('/icons/icon-192x192.png')
  icon192(@Res() res) {
    return res.sendFile('icon-192x192.png', { root: './public/icons' });
  }

  @Get('/icons/icon-256x256.png')
  icon256(@Res() res) {
    return res.sendFile('icon-256x256.png', { root: './public/icons' });
  }

  @Get('/icons/icon-384x384.png')
  icon1384(@Res() res) {
    return res.sendFile('icon-384x384.png', { root: './public/icons' });
  }

  @Get('/icons/icon-512x512.png')
  icons512(@Res() res) {
    return res.sendFile('icon-512x512.png', { root: './public/icons' });
  }
}