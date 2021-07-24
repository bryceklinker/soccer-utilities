import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@soccer-utilities/nest-auth0';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('/.health')
@ApiTags('Health')
export class HealthController {
  @Get()
  @AllowAnonymous()
  @ApiOkResponse({ type: Object })
  health() {
    return {};
  }
}
