export type ErrorObject = {
	loc: {
		start: Coordinates;
		end?: Coordinates;
	};
};

type Coordinates = {
	line: number;
	column: number;
};
