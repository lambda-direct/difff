export type FormatError = {
    loc: {
        start: Coordinates;
        end?: Coordinates;
    };
};

export type ToolsRoute = {
    name: string;
    path: string;
};

export type Post = {
    title: string;
    description: string;
    date: string;
    weekNumber: number;
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
