export type FormatError = {
	loc: {
		start: Coordinates;
		end?: Coordinates;
	};
};

export type Post = {
	title: string;
	description: string;
	data: string;
};

export type ResponsePosts = Post & { slug: string };
type Coordinates = {
	line: number;
	column: number;
};
