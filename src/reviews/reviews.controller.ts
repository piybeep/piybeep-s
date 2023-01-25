import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { FindAllReviewsDto } from './dto/findAll-reviews.dto';
import { Review } from './entities/review.entity';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@ApiCreatedResponse({ type: Review })
	@Post()
	create(@Body() createReviewDto: CreateReviewDto) {
		return this.reviewsService.create(createReviewDto);
	}

	@ApiOkResponse({ type: Review, isArray: true })
	@Get()
	findAll(@Query() options: FindAllReviewsDto) {
		return this.reviewsService.findAll(options);
	}

	@ApiOkResponse({ type: Review })
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.reviewsService.findOne(id);
	}
}
