import { EditorView, Decoration, type DecorationSet } from "@codemirror/view";
import { errorMessage, showError } from "~/storage/store";
import { StateEffect, StateField } from "@codemirror/state";

class Highlight {
    view: EditorView;
    constructor(view: EditorView) {
        this.view = view;
    }

    private parsePrettierErrorMessage = (error: string) => {
        const regex = /(.*) \((\d+:\d+)\)/;
        const match = error.match(regex);
        if (match) {
            const description = match[1].trim();
            const location = match[2];
            return `${description} at ${location}`;
        }
        return "Invalid JSON";
    };

    public highlightErrorJSON = (columnNumber: number, lineNumber: number, message: string) => {
        removeHighlightedLines(this.view);
        const errMessage = this.parsePrettierErrorMessage(message);
        const line = this.view.state.doc.line(lineNumber);
        if (line.from === 0) {
            errorMessage.set(errMessage);
            this.view.dispatch({
                effects: [
                    addHighlight.of({
                        from: columnNumber,
                        to: line.to
                    })
                ]
            });
        } else if (line.text === "") {
            errorMessage.set("Seems like a missing closing parenthesis '}'");
            this.view.dispatch({
                effects: [
                    addHighlight.of({
                        from: 1,
                        to: line.to
                    })
                ]
            });
        } else {
            errorMessage.set(errMessage);
            this.view.dispatch({
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

    public highlightErrorXML = (lineNumber: number, message: string) => {
        removeHighlightedLines(this.view);
        const line = this.view.state.doc.line(lineNumber);
        errorMessage.set(`Invalid, ${message}`);
        if (line.text !== "") {
            this.view.dispatch({
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

    public highlightErrorYAML = (position: number, lineNumber: number, reason: string) => {
        removeHighlightedLines(this.view);
        const line = this.view.state.doc.line(lineNumber === 0 ? 1 : lineNumber);
        errorMessage.set(`Invalid, ${reason}`);
        if (line.text === "") {
            this.view.dispatch({
                effects: [
                    addHighlight.of({
                        from: 1,
                        to: line.to
                    })
                ]
            });
        } else {
            try {
                this.view.dispatch({
                    effects: [
                        addHighlight.of({
                            from: position,
                            to: line.to
                        }),
                        EditorView.scrollIntoView(line.from, { y: "nearest", x: "nearest" })
                    ]
                });
            } catch (err) {
                this.view.dispatch({
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
}

export default Highlight;
const lineHighlight = Decoration.mark({ class: "error" });
const removeHighlights = StateEffect.define();

export const lineHighlightField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(highlights, tr) {
        for (const e of tr.effects) {
            if (e.is(removeHighlights)) {
                highlights = highlights.update({
                    filter: () => {
                        return false;
                    }
                });
            } else if (e.is(addHighlight)) {
                highlights = highlights.update({
                    add: [lineHighlight.range(e.value.from, e.value.to)]
                });
            }
        }
        return highlights;
    },
    provide: (f) => EditorView.decorations.from(f)
});

const addHighlight = StateEffect.define<{ from: number; to: number }>({
    map: ({ from, to }, change) => ({
        from: change.mapPos(from),
        to: change.mapPos(to)
    })
});

const removeHighlightedLines = (view: EditorView) => {
    view.dispatch({
        effects: [StateEffect.define().of(null)]
    });
    errorMessage.set("");
    showError.set(false);
};
