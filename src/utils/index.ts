import axios from "axios";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { EditorView } from "@codemirror/view";
import { addHighlightedLine, removeHighlightedLines } from "~/lib/shared/codemirror/codeMirror";
import { showError } from "~/lib/storages";
import { isFormatError } from "./helpers";

export const formattedDate = (inputDate: string) => {
    const [day, month, year] = inputDate.split("-");
    return new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

class JSONDataOperations {
    private optionsJSON = {
        tabWidth: 4,
        semi: true,
        useTabs: false,
        singleQuote: false,
        trailingComma: "none" as const,
        endOfLine: "lf" as const,
        printWidth: 100,
        parser: "json",
        plugins: [parserBabel, prettierPluginEstree]
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

    public prettierFormatJSON = async (userInput: string) => {
        const json = await this.dataFromUrl(userInput);
        return await prettier.format(json, this.optionsJSON);
    };

    public validateJson = async (value: string, view: EditorView) => {
        if (value) {
            try {
                await this.prettierFormatJSON(value);
                removeHighlightedLines(view);
                showError.set(false);
                return;
            } catch (err) {
                if (isFormatError(err)) {
                    addHighlightedLine(view, err.loc.start.line);
                }
                showError.set(true);
                return;
            }
        } else {
            showError.set(false);
            return;
        }
    };
}

export default new JSONDataOperations();
