import { Controller, Get, HttpException, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Express } from 'express';
import { GetCurrentScheduleQuery, UpdateCurrentScheduleCommand } from '@soccer-utilities/schedules-api';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Readable } from 'stream';
import { GameScheduleModel } from '@soccer-utilities/core';
import { constants } from 'http2';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get('current')
  async getCurrentSchedule() {
    const query = new GetCurrentScheduleQuery();
    const schedule = await this.queryBus.execute<GetCurrentScheduleQuery, GameScheduleModel | null>(query);
    if (schedule) {
      return schedule;
    }

    throw new HttpException('Could not find current schedule', constants.HTTP_STATUS_NOT_FOUND);
  }

  @Post('current')
  @UseInterceptors(FileInterceptor('scheduleFile'))
  async updateCurrentSchedule(@UploadedFile() file: Express.Multer.File): Promise<{ id: string }> {
    const command = new UpdateCurrentScheduleCommand(Readable.from(file.buffer));
    return await this.commandBus.execute(command);
  }
}
