export type LocaleStorageSchema = {
    json: Options;
    yaml: Options;
    xml: Options;
};

type Options = {
    spaces: number;
    tab?: boolean;
};

export type LocaleStorageResponce = { spaces: number; tab?: boolean } | null;

export type ChosenSetting = "spaces" | "tab";
