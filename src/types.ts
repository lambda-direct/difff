export type FormatJSONError = {
    message: string;
    loc: {
        start: Coordinates;
        end?: Coordinates;
    };
};
export type CursorPosition = { line: number; col: number };
export type UploadEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
export type FormatYamlError = {
    mark: { name: null; buffer: string; position: number; line: number; column: number };
    message: string;
    name: string;
    reason: string;
    stack: string;
};

export type ToolsRoute = {
    name: string;
    group: string;
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

export type TwitterCard = {
    title?: string;
    description?: string;
};

export type OGCard = {
    title?: string;
    description?: string;
    locale: string;
    type: string;
};

export type Formats = "json" | "yaml" | "xml";

type JSONvalues = string | string[] | object;
export type PossibleJSON = { [key: string]: JSONvalues };

export type SearchData = {
    search: string;
    replace: string;
    caseSensitive: boolean;
    regexp: boolean;
    wholeWord: boolean;
};
