import { EditorView } from "@codemirror/view";
import { XMLValidator } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as prettier from "prettier/standalone";
import xmlFormat from "xml-formatter";
import { removeHighlightedLines, updateCodemirror } from "~/lib/components/codemirror/codemirror";
import { addHighlightedLineJSON } from "~/lib/components/codemirror/codemirrorJSON";
import { highlightErrorLineXML } from "~/lib/components/codemirror/codemirrorXML";
import { addHighlightedLineYaml } from "~/lib/components/codemirror/codemirrorYAML";
import type { FormatError } from "~/types";
import { Converter } from "./Converter";
import Validator from "./Validator";
import { prettierSettings } from "./settings";

class Formatter {
    private isFormatError = (error: unknown): error is FormatError => {
        return <FormatError>error !== undefined && (<FormatError>error).loc !== undefined;
    };

    formatJson = async (
        userInput: string,
        view: EditorView,
        options: { tabWidth: number; useTabs: boolean }
    ) => {
        try {
            const originalCode = await Converter.urlToJson(userInput);
            const formattedResult = await prettier.format(originalCode, {
                ...prettierSettings,
                ...options
            });

            removeHighlightedLines(view);

            if (originalCode === formattedResult) return;
            updateCodemirror(view, formattedResult);
        } catch (err) {
            if (this.isFormatError(err)) {
                addHighlightedLineJSON(view, err.loc.start.column, err.loc.start.line);
            }
        }
    };

    public formatYaml = (userInput: string, view: EditorView, options: { indent: number }) => {
        try {
            const yamlObject = yaml.load(userInput);
            const formattedYaml = yaml.dump(yamlObject, options);
            removeHighlightedLines(view);

            updateCodemirror(view, formattedYaml);

            return;
        } catch (err) {
            if (Validator.isYamlError(err))
                addHighlightedLineYaml(view, err.mark.position, err.mark.line, err.reason);
            return;
        }
    };

    public formatXml = (userInput: string, view: EditorView, spaceNum: number) => {
        if (userInput) {
            const validationResult = XMLValidator.validate(userInput, {
                allowBooleanAttributes: true
            });

            if (validationResult === true) {
                const options = { indentation: " ".repeat(spaceNum) };
                const formattedXML = xmlFormat(userInput, options);
                removeHighlightedLines(view);
                updateCodemirror(view, formattedXML);
            } else {
                highlightErrorLineXML(view, validationResult.err.line, validationResult.err.msg);
            }
        } else {
            updateCodemirror(view, userInput);
        }
    };
}
export default new Formatter();
