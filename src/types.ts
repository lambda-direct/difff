export type FormatError = {
	loc: {
		start: Coordinates;
		end?: Coordinates;
	};
};

type Coordinates = {
	line: number;
	column: number;
};
