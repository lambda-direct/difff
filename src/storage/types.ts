export type LocaleStorageSchema = {
    json: OptionsWithSpace & OptionsWithTab;
    yaml: OptionsWithSpace;
    xml: OptionsWithSpace;
};

export type LocaleStorageResponce = { spaces: number; tab?: boolean } | null;

type OptionsWithSpace = {
    spaces: number;
};

type OptionsWithTab = {
    tab: boolean;
};
