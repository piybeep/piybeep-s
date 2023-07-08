import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deprecated')
@Controller('feedback')
export class AppController {
}
