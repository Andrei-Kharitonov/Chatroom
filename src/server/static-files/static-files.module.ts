import { Module } from '@nestjs/common';
import { StaticFilesController } from './static-files.controller';

@Module({
  imports: [],
  controllers: [StaticFilesController],
  providers: [],
})
export class StaticFilesModule { }