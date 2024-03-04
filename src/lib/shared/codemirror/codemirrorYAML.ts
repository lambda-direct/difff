import { EditorView } from "codemirror";
import { errorMessage, showError } from "~/lib/storages";
import { addHighlight, removeHighlightedLines } from "~/lib/shared/codemirror/codemirror";

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
