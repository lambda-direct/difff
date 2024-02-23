export type FormatError = {
	loc: {
		start: Coordinates;
		end?: Coordinates;
	};
};

export type Post = {
	title: string;
	description: string;
	date: string;
};

export type Article = {
	metaTitle: string;
	metaDescription: string;
};

export type ResponsePosts = Post & { slug: string };
type Coordinates = {
	line: number;
	column: number;
};
