import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

export const prettierSettings = {
    semi: true,
    singleQuote: false,
    trailingComma: "none" as const,
    endOfLine: "lf" as const,
    printWidth: 100,
    bracketSameLine: true,
    parser: "json-stringify",
    plugins: [parserBabel, prettierPluginEstree]
};

export const prettierJSSettings = {
    semi: true,
    singleQuote: false,
    trailingComma: "none" as const,
    endOfLine: "lf" as const,
    printWidth: 80,
    bracketSameLine: true,
    bracketSpacing: true,
    parser: "babel",
    plugins: [parserBabel, prettierPluginEstree]
};
