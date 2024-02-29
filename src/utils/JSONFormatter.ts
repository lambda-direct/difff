import axios from "axios";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { EditorView } from "@codemirror/view";
import {
    addHighlightedLineJSON,
    highlightErrorLineJSON,
    removeHighlightedLines
} from "~/lib/shared/codemirror/codeMirror";
import type { FormatError } from "~/types";

class JSONDataOperations {
    private optionsJSON = {
        tabWidth: 4,
        semi: true,
        useTabs: false,
        singleQuote: false,
        trailingComma: "none" as const,
        endOfLine: "lf" as const,
        printWidth: 100,
        bracketSameLine: true,
        parser: "json-stringify",
        plugins: [parserBabel, prettierPluginEstree]
    };

    private isFormatError = (error: unknown): error is FormatError => {
        return <FormatError>error !== undefined && (<FormatError>error).loc !== undefined;
    };

    private isURL = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    };

    private dataFromUrl = async (userInput: string) => {
        if (this.isURL(userInput)) {
            try {
                const response = await axios.get(userInput);
                return JSON.stringify(response.data);
            } catch (err) {
                return userInput;
            }
        } else {
            return userInput;
        }
    };

    public validateJSON = async (input: string, view: EditorView) => {
        try {
            await prettier.format(input, this.optionsJSON);
            removeHighlightedLines(view);
        } catch (err) {
            if (this.isFormatError(err)) {
                highlightErrorLineJSON(view, err.loc.start.line);
            }
        }
    };

    public prettierFormatJSON = async (userInput: string, view: EditorView) => {
        if (userInput) {
            try {
                const json = await this.dataFromUrl(userInput);
                const formattedJSON = await prettier.format(json, this.optionsJSON);
                removeHighlightedLines(view);
                view.dispatch({
                    effects: [EditorView.scrollIntoView(1, { y: "nearest", x: "start" })]
                });
                return formattedJSON;
            } catch (err) {
                if (this.isFormatError(err)) {
                    addHighlightedLineJSON(view, err.loc.start.line);
                }
                return userInput;
            }
        } else {
            removeHighlightedLines(view);
            return userInput;
        }
    };
}

export default new JSONDataOperations();
