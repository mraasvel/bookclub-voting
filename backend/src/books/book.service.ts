import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BOOKS } from './books';

@Injectable()
export class BookService {
	constructor(
		@InjectRepository(Book) private bookRepository: Repository<Book>,
	) {}

	async seedDatabase() {
		// init book table
		for (const book of BOOKS) {
			const found = await this.bookRepository.findOneBy({
				name: book.name,
			});
			if (found) {
				continue;
			}
			const entity = this.bookRepository.create(book);
			await this.bookRepository.save(entity);
		}
	}

	async find() {
		return this.bookRepository.find();
	}
}
