import { EditorView } from "codemirror";
import { addHighlight, removeHighlightedLines } from "~/lib/shared/codemirror/codemirror";
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

export const highlightErrorLineJSON = (view: EditorView, lineNumber: number) => {
    removeHighlightedLines(view);
    const line = view.state.doc.line(lineNumber);
    if (line.from === 0) {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: line.from,
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
