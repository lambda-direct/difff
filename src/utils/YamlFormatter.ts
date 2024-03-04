import * as yaml from "js-yaml";
import { EditorView } from "@codemirror/view";
import type { FormatYamlError } from "~/types";
import { addHighlightedLineYaml } from "~/lib/shared/codemirror/codemirrorYAML";
import { removeHighlightedLines } from "~/lib/shared/codemirror/codemirror";

class YAMLDataOperations {
    private isYamlError = (error: unknown): error is FormatYamlError => {
        return (
            <FormatYamlError>error !== undefined && (<FormatYamlError>error).mark.line !== undefined
        );
    };

    public validateYAML = (input: string, view: EditorView) => {
        try {
            yaml.load(input);
            removeHighlightedLines(view);
        } catch (err) {
            if (this.isYamlError(err))
                addHighlightedLineYaml(view, err.mark.position, err.mark.line, err.reason);
        }
    };

    public formatYAML = (userInput: string, view: EditorView) => {
        if (userInput) {
            try {
                const yamlObject = yaml.load(userInput);
                const formattedYaml = yaml.dump(yamlObject);
                removeHighlightedLines(view);
                view.dispatch({
                    effects: [EditorView.scrollIntoView(1, { y: "center" })]
                });
                return formattedYaml;
            } catch (err) {
                if (this.isYamlError(err)) {
                    addHighlightedLineYaml(view, err.mark.position, err.mark.line, err.reason);
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
