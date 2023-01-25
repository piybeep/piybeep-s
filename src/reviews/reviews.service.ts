import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { FindAllReviewsDto } from './dto/findAll-reviews.dto';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectRepository(Review) private reviewsRepos: Repository<Review>,
	) {}

	create(createReviewDto: CreateReviewDto) {
		const review = this.reviewsRepos.create(createReviewDto);

		return this.reviewsRepos.save(review);
	}

	findAll(options: FindAllReviewsDto) {
		const take = options.count ?? 12;
		const skip = options.offset ?? 0;

		return this.reviewsRepos.findAndCount({ take, skip });
	}

	findOne(id: string) {
		return this.reviewsRepos.findOne({ where: { id } });
	}
}
