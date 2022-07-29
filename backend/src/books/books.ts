// todo: just hardcode all available books?

interface IBook {
	name: string,
	author: string,
}

export const BOOKS: IBook[] = [
	{
		name: "Introduction to Algorithms",
		author: "Thomas H. Cormen",
	},
	{
		name: "Book Two",
		author: "Maarten",
	},
]
