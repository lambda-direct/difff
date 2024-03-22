export type LocaleStorageSchema = {
    json: Options;
    yaml: Options;
    xml: Options;
};

export type LocaleStorageResponce = { spaces: number; tab?: boolean } | null;

type Options = {
    spaces: number;
    tab?: boolean;
};

export type Formats = "json" | "yaml" | "xml";
