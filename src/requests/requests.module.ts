import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { MailModule } from 'src/mail/mail.module';
import { RequestStatuses } from './entities/request.statuses.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
	imports: [TypeOrmModule.forFeature([Request, RequestStatuses]), MailModule, ServicesModule],
	controllers: [RequestsController],
	providers: [RequestsService],
	exports: [RequestsService],
})
export class RequestsModule {}
