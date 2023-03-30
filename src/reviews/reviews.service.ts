import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { FindAllReviewsDto } from './dto/findAll-reviews.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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
	async delete(id: string) {
		try {
			const result: DeleteResult = await this.reviewsRepos.delete({ id });
			if (result.affected > 0)
				return new HttpException('ok', HttpStatus.OK);
			else
				return new HttpException(
					"such review doesn't exists",
					HttpStatus.NOT_FOUND,
				);
		} catch (err) {
			console.log('ReviewsService.delete', err);
			return new HttpException(
				'Server error',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async update(id: string, payload: UpdateReviewDto) {
		try {
			const result: UpdateResult = await this.reviewsRepos.update(
				id,
				payload,
			);
			if (result.affected > 0) {
				return await this.reviewsRepos.findOneBy({ id });
			} else {
				return new HttpException('no such review', 404);
			}
		} catch (err) {
			console.log('ReviewsService.update', err);
			return new HttpException('Server error', 500);
		}
	}
}
