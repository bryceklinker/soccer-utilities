import {
  Controller,
  Get,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  GetCurrentScheduleQuery,
  UpdateCurrentScheduleCommand,
  GameScheduleDto,
} from '@soccer-utilities/schedules-api';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Readable } from 'stream';
import { constants } from 'http2';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UploadScheduleModel } from './upload-schedule.model';

@Controller('schedules')
@ApiTags('Schedules')
export class SchedulesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get('current')
  @ApiOkResponse({ type: GameScheduleDto })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async getCurrentSchedule() {
    const query = new GetCurrentScheduleQuery();
    const schedule = await this.queryBus.execute<
      GetCurrentScheduleQuery,
      GameScheduleDto | null
    >(query);
    if (schedule) {
      return schedule;
    }

    throw new HttpException(
      'Could not find current schedule',
      constants.HTTP_STATUS_NOT_FOUND
    );
  }

  @Post('current')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadScheduleModel })
  @UseInterceptors(FileInterceptor('scheduleFile'))
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiCreatedResponse({ type: String, description: 'id of current schedule' })
  async updateCurrentSchedule(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ id: string }> {
    const command = new UpdateCurrentScheduleCommand(
      Readable.from(file.buffer)
    );
    return await this.commandBus.execute(command);
  }
}
