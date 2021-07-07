import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@soccer-utilities/nest-auth0';

@Controller('/.health')
export class HealthController {
  @Get()
  @AllowAnonymous()
  health() {
    return {};
  }
}
