import type { FormatJSONError, FormatYamlError } from "~/types";
import type { ValidationError } from "fast-xml-parser";

export const isJSONError = (error: unknown): error is FormatJSONError => {
    return <FormatJSONError>error !== undefined && (<FormatJSONError>error).loc !== undefined;
};

export const isYamlError = (error: unknown): error is FormatYamlError => {
    return (
        <FormatYamlError>error !== undefined &&
        (<FormatYamlError>error).mark !== undefined &&
        (<FormatYamlError>error).mark.line !== undefined &&
        (<FormatYamlError>error).mark.position !== undefined &&
        (<FormatYamlError>error).reason !== undefined
    );
};

export const isXMLError = (error: unknown): error is ValidationError => {
    return (
        <ValidationError>error !== undefined &&
        (<ValidationError>error).err !== undefined &&
        (<ValidationError>error).err.line !== undefined &&
        (<ValidationError>error).err.msg !== undefined
    );
};

export const isURL = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};
