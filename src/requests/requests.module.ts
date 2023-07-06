import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { ServicesModule } from 'src/services/services.module';
import { Request } from './entities/request.entity';
import { RequestStatuses } from './entities/request.statuses.entity';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
	imports: [TypeOrmModule.forFeature([Request, RequestStatuses]), MailModule, ServicesModule],
	controllers: [RequestsController],
	providers: [RequestsService],
	exports: [RequestsService],
})
export class RequestsModule {}
