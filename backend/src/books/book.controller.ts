import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { BookService } from './book.service';

@Controller('book')
@ApiTags('book')
@UseGuards(AuthenticatedGuard)
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get()
	async find() {
		const books = await this.bookService.find();
		return books;
	}
}
