import { EditorView } from "codemirror";
import { addHighlight, removeHighlightedLines } from "~/lib/components/codemirror/codemirror";
import { errorMessage, showError } from "~/lib/storages";

const parsePrettierErrorMessage = (error: string) => {
    const regex = /(.*) \((\d+:\d+)\)/;
    const match = error.match(regex);
    if (match) {
        const description = match[1].trim();
        const location = match[2];
        return `${description} at ${location}`;
    }
    return "Invalid JSON";
};

export const addHighlightedLineJSON = (
    view: EditorView,
    columnNumber: number,
    lineNumber: number,
    message: string
) => {
    removeHighlightedLines(view);
    const errMessage = parsePrettierErrorMessage(message);
    const line = view.state.doc.line(lineNumber);
    if (line.from === 0) {
        errorMessage.set(errMessage);
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: columnNumber,
                    to: line.to
                })
            ]
        });
    } else if (line.text === "") {
        errorMessage.set("Seems like a missing closing parenthesis '}'");
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: 1,
                    to: line.to
                })
            ]
        });
    } else {
        errorMessage.set(errMessage);
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
