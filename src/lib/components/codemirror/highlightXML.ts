import { EditorView } from "codemirror";
import { addHighlight, removeHighlightedLines } from "~/lib/components/codemirror/codemirror";
import { errorMessage, showError } from "~/lib/storages";

export const highlightErrorLineXML = (view: EditorView, lineNumber: number, message: string) => {
    removeHighlightedLines(view);
    const line = view.state.doc.line(lineNumber);
    errorMessage.set(`Invalid, ${message}`);
    if (line.text !== "") {
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
