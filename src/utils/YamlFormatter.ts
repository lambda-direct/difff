import * as yaml from "js-yaml";
import { EditorView } from "@codemirror/view";
import { addHighlightedLineYaml, removeHighlightedLines } from "~/lib/shared/codemirror/codeMirror";
import type { FormatYamlError } from "~/types";

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

    public formatYAML = async (userInput: string, view: EditorView) => {
        if (userInput) {
            try {
                const yamlObject = yaml.load(userInput);
                const formattedYaml = yaml.dump(yamlObject);
                removeHighlightedLines(view);
                return formattedYaml;
            } catch (err) {
                console.log("err:", err);
                if (this.isYamlError(err)) {
                    addHighlightedLineYaml(view, err.mark.line, err.reason);
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
