import { search } from "@codemirror/search";
import { themeExtensions } from "~/lib/shared/codemirror/themes/theme";
import { EditorView, basicSetup } from "codemirror";
import {
    addHighlight,
    lineHighlightField,
    removeHighlightedLines
} from "~/lib/shared/codemirror/codeMirror";
import { errorMessage, showError } from "~/lib/storages";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import { StreamLanguage } from "@codemirror/language";

const yaml = StreamLanguage.define(yamlMode.yaml);

export const addHighlightedLineYaml = (
    view: EditorView,
    position: number,
    lineNumber: number,
    reason: string
) => {
    removeHighlightedLines(view);
    const line = view.state.doc.line(lineNumber === 0 ? 1 : lineNumber);
    errorMessage.set(reason);
    if (line.text === "") {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: 1,
                    to: line.to
                })
            ]
        });
    } else {
        try {
            view.dispatch({
                effects: [
                    addHighlight.of({
                        from: position,
                        to: line.to
                    }),
                    EditorView.scrollIntoView(line.from, { y: "nearest", x: "nearest" })
                ]
            });
        } catch (err) {
            view.dispatch({
                effects: [
                    addHighlight.of({
                        from: line.from,
                        to: line.to
                    }),
                    EditorView.scrollIntoView(line.from, { y: "nearest", x: "nearest" })
                ]
            });
        }
    }
    showError.set(true);
};
export const stateExtensions = [
    basicSetup,
    lineHighlightField,
    yaml,
    themeExtensions,
    search({ top: true })
];
