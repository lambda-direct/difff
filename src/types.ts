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
	id: number;
};

export type Article = {
	title: string;
	content: string;
	subTitle?: string;
	subContent?: string;
};

export type ResponsePosts = Post & { slug: string };
type Coordinates = {
	line: number;
	column: number;
};
