import * as yaml from "js-yaml";
import { EditorView } from "@codemirror/view";
import type { FormatYamlError } from "~/types";
import { addHighlightedLineYaml, removeHighlightedLines } from "~/lib/shared/codemirror/codeMirror";

class YAMLDataOperations {
    // private isURL = (url: string) => {
    //     try {
    //         new URL(url);
    //         return true;
    //     } catch (err) {
    //         return false;
    //     }
    // };

    // private dataFromUrl = async (userInput: string) => {
    //     if (this.isURL(userInput)) {
    //         try {
    //             const response = await axios.get(userInput);
    //             return JSON.stringify(response.data);
    //         } catch (err) {
    //             return userInput;
    //         }
    //     } else {
    //         return userInput;
    //     }
    // };
    private isYamlError = (error: unknown): error is FormatYamlError => {
        return (
            <FormatYamlError>error !== undefined && (<FormatYamlError>error).mark.line !== undefined
        );
    };

    public validateYAML = (input: string, view: EditorView) => {
        try {
            const yamlObject = yaml.load(input);
            yaml.dump(yamlObject);
            removeHighlightedLines(view);
        } catch (err) {
            if (this.isYamlError(err)) {
                addHighlightedLineYaml(view, err.mark.line, err.mark.position, "");
            }
        }
    };

    public formatYAML = async (userInput: string, view: EditorView) => {
        if (userInput) {
            try {
                const yamlObject = await yaml.load(userInput);
                const formattedYaml = yaml.dump(yamlObject);
                removeHighlightedLines(view);
                return formattedYaml;
            } catch (err) {
                if (this.isYamlError(err)) {
                    addHighlightedLineYaml(view, err.mark.line, err.mark.position, err.reason);
                }
                return userInput;
            }
        } else {
            removeHighlightedLines(view);
            return userInput;
        }
    };
}

export default new YAMLDataOperations();
