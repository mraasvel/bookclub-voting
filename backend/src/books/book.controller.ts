import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { BookService } from './book.service';

@Controller('book')
@UseGuards(AuthenticatedGuard)
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get()
	async find() {
		const books = await this.bookService.find();
		return books;
	}
}
