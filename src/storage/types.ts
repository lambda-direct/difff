export type LocaleStorageSchema = {
    json: Options;
    yaml: Options;
    xml: Options;
};

export type LocaleStorageResponce = { spaces: number; tab?: boolean } | null;

export type Options = {
    spaces: number;
    tab?: boolean;
};
