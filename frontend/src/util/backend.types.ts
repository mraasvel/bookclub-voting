export enum Role {
	User = 'User',
	SuperUser = 'SuperUser',
}

export interface Vote {
	user: number;
	poll: number;
	scores: number[];
}

export interface Poll {
	id: number;
	name: string;
	options: string[];
	votes: Vote[];
	closed: boolean;
}
