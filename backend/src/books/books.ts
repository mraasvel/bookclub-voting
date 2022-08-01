// todo: just hardcode all available books?
// todo: set up voting entity and let users enter options

interface IBook {
	name: string;
	author: string;
}

export const BOOKS: IBook[] = [
	{
		name: 'Introduction to Algorithms',
		author: 'Thomas H. Cormen',
	},
	{
		name: 'Book Two',
		author: 'Maarten',
	},
];
