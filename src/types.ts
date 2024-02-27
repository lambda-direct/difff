export type FormatError = {
    loc: {
        start: Coordinates;
        end?: Coordinates;
    };
};

export type FormatYamlError = {
    mark: { name: null; buffer: string; position: number; line: number; column: number };
    message: string;
    name: string;
    reason: string;
    stack: string;
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
