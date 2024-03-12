import * as yaml from "js-yaml";
import { EditorView } from "@codemirror/view";
import type { FormatYamlError } from "~/types";
import { addHighlightedLineYaml } from "~/lib/shared/codemirror/codemirrorYAML";
import { removeHighlightedLines, updateCodemirror } from "~/lib/shared/codemirror/codemirror";

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

    public formatYAML = (userInput: string, view: EditorView, options: { indent: number }) => {
        try {
            const yamlObject = yaml.load(userInput);
            const formattedYaml = yaml.dump(yamlObject, options);
            removeHighlightedLines(view);

            updateCodemirror(view, formattedYaml);

            return;
        } catch (err) {
            if (this.isYamlError(err))
                addHighlightedLineYaml(view, err.mark.position, err.mark.line, err.reason);
            return;
        }
    };
}

export default new YAMLDataOperations();
