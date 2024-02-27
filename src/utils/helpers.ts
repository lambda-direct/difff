import type { FormatError, FormatYamlError } from "~/types";

export const isFormatError = (error: unknown): error is FormatError => {
    return <FormatError>error !== undefined && (<FormatError>error).loc !== undefined;
};
export const isYamlError = (error: unknown): error is FormatYamlError => {
    return <FormatYamlError>error !== undefined && (<FormatYamlError>error).mark.line !== undefined;
};
