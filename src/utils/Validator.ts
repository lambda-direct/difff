import { EditorView } from "@codemirror/view";
import { XMLValidator } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as prettier from "prettier/standalone";
import { removeHighlightedLines } from "~/lib/components/codemirror/codemirror";
import { highlightErrorLineJSON } from "~/lib/components/codemirror/codemirrorJSON";
import { highlightErrorLineXML } from "~/lib/components/codemirror/codemirrorXML";
import { addHighlightedLineYaml } from "~/lib/components/codemirror/codemirrorYAML";
import type { FormatError, FormatYamlError } from "~/types";
import { prettierSettings } from "./settings";

class Validator {
    private isFormatError = (error: unknown): error is FormatError => {
        return <FormatError>error !== undefined && (<FormatError>error).loc !== undefined;
    };

    isYamlError = (error: unknown): error is FormatYamlError => {
        return (
            <FormatYamlError>error !== undefined && (<FormatYamlError>error).mark.line !== undefined
        );
    };

    validateYAML = (input: string, view: EditorView) => {
        try {
            yaml.load(input);
            removeHighlightedLines(view);
        } catch (err) {
            if (this.isYamlError(err))
                addHighlightedLineYaml(view, err.mark.position, err.mark.line, err.reason);
        }
    };

    isURL = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    };

    validateXML = (input: string, view: EditorView) => {
        const validationResult = XMLValidator.validate(input);
        if (validationResult === true) {
            removeHighlightedLines(view);
        } else {
            highlightErrorLineXML(view, validationResult.err.line, validationResult.err.msg);
        }
    };

    validateJSON = (input: string, view: EditorView) => {
        prettier
            .format(input, prettierSettings)
            .then(() => {
                removeHighlightedLines(view);
            })
            .catch((err) => {
                if (this.isFormatError(err)) highlightErrorLineJSON(view, err.loc.start.line);
            });
    };
}

export default new Validator();
