import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
	imports: [TypeOrmModule.forFeature([Request]), MailModule],
	controllers: [RequestsController],
	providers: [RequestsService],
})
export class RequestsModule {}
