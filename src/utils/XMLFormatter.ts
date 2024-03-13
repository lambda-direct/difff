import { EditorView } from "@codemirror/view";
import { removeHighlightedLines, updateCodemirror } from "~/lib/components/codemirror/codemirror";
import { XMLValidator } from "fast-xml-parser";
import xmlFormat from "xml-formatter";
import { highlightErrorLineXML } from "~/lib/components/codemirror/codemirrorXML";

class XMLDataOperations {
    public validateXML = (input: string, view: EditorView) => {
        const validationResult = XMLValidator.validate(input);
        if (validationResult === true) {
            removeHighlightedLines(view);
        } else {
            highlightErrorLineXML(view, validationResult.err.line, validationResult.err.msg);
        }
    };
    public formatXML = (userInput: string, view: EditorView, spaceNum: number) => {
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

export default new XMLDataOperations();
