import { EditorView, Decoration, type DecorationSet } from "@codemirror/view";
import { errorMessage } from "~/storage/store";
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

    public highlightErrorJSON = (lineNumber: number, message: string) => {
        removeHighlightedLines(this.view);
        const errMessage = this.parsePrettierErrorMessage(message);
        const line = this.view.state.doc.line(lineNumber);
        if (line.text === "") {
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
    };

    public highlightErrorLine = (lineNumber: number) => {
        removeHighlightedLines(this.view);
        const line = this.view.state.doc.line(lineNumber);
        errorMessage.set(`Invalid format.`);

        this.view.dispatch({
            effects: [
                addHighlight.of({
                    from: line.from,
                    to: line.to
                }),
                EditorView.scrollIntoView(line.from, { y: "nearest", x: "start" })
            ]
        });
    };

    public highlightErrorYAML = (lineNumber: number, reason: string) => {
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
    };
}

export default Highlight;

const lineHighlight = Decoration.mark({ class: "error" });
const removeHighlights = StateEffect.define();
const addHighlight = StateEffect.define<{ from: number; to: number }>({
    map: ({ from, to }, change) => ({
        from: change.mapPos(from),
        to: change.mapPos(to)
    })
});

export const lineHighlightField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(highlights, tr) {
        for (const e of tr.effects) {
            if (e.is(removeHighlights)) {
                highlights = Decoration.none;
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

export const removeHighlightedLines = (view: EditorView) => {
    view.dispatch({
        effects: [removeHighlights.of(null)]
    });
};
