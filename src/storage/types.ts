export type LocaleStorageSchema = {
    json: OptionsWithSpace & OptionsWithTab;
    yaml: OptionsWithSpace;
    xml: OptionsWithSpace;
};

export type LocaleStorageResponce = (OptionsWithSpace & OptionsWithTab) | OptionsWithTab | null;

type OptionsWithSpace = {
    spaces: number;
};

type OptionsWithTab = {
    tab: boolean;
};
