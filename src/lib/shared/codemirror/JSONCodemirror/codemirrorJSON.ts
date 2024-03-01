import { search } from "@codemirror/search";
import { themeExtensions } from "~/lib/shared/codemirror/themes/theme";
import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";
import {
    addHighlight,
    lineHighlightField,
    removeHighlightedLines
} from "~/lib/shared/codemirror/codeMirror";
import { errorMessage, showError } from "~/lib/storages";

export const addHighlightedLineJSON = (
    view: EditorView,
    columnNumber: number,
    lineNumber: number
) => {
    removeHighlightedLines(view);
    const line = view.state.doc.line(lineNumber);
    if (line.from === 0) {
        errorMessage.set("JSON");
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: columnNumber,
                    to: line.to
                })
            ]
        });
    } else if (line.text === "") {
        errorMessage.set("seems like a missing closing parenthesis '}'");
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: 1,
                    to: line.to
                })
            ]
        });
    } else {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: line.from,
                    to: line.to
                }),
                EditorView.scrollIntoView(line.from, { y: "nearest", x: "start" })
            ]
        });
    }
    showError.set(true);
};

export const highlightErrorLineJSON = (
    view: EditorView,
    columnNumber: number,
    lineNumber: number
) => {
    removeHighlightedLines(view);
    const line = view.state.doc.line(lineNumber);
    if (line.from === 0) {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: columnNumber,
                    to: line.to
                })
            ]
        });
    } else if (line.text === "") {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: 1,
                    to: line.to
                })
            ]
        });
    } else {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: line.from,
                    to: line.to
                }),
                EditorView.scrollIntoView(line.from, { y: "nearest", x: "start" })
            ]
        });
    }
};

export const stateExtensions = [
    basicSetup,
    lineHighlightField,
    json(),
    themeExtensions,
    search({ top: true })
];
