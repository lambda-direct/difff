import { StateEffect, StateEffectType } from "@codemirror/state";
import { Decoration, EditorView } from "@codemirror/view";
import { errorMessage, showError } from "~/lib/storages";

class Highlight {
    view: EditorView;
    removeHighlights: StateEffectType<null>;
    lineHighlight: Decoration;
    constructor(view: EditorView) {
        this.view = view;
        this.removeHighlights = StateEffect.define();
        this.lineHighlight = Decoration.mark({ class: "error" });
    }

    public removeHighlightedLines = (view: EditorView) => {
        view.dispatch({
            effects: [this.removeHighlights.of(null)]
        });
        errorMessage.set("");
        showError.set(false);
    };
    private addHighlight = StateEffect.define<{ from: number; to: number }>({
        map: ({ from, to }, change) => ({
            from: change.mapPos(from),
            to: change.mapPos(to)
        })
    });

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
        this.removeHighlightedLines(this.view);
        const errMessage = this.parsePrettierErrorMessage(message);
        const line = this.view.state.doc.line(lineNumber);
        if (line.from === 0) {
            errorMessage.set(errMessage);
            this.view.dispatch({
                effects: [
                    this.addHighlight.of({
                        from: columnNumber,
                        to: line.to
                    })
                ]
            });
        } else if (line.text === "") {
            errorMessage.set("Seems like a missing closing parenthesis '}'");
            this.view.dispatch({
                effects: [
                    this.addHighlight.of({
                        from: 1,
                        to: line.to
                    })
                ]
            });
        } else {
            errorMessage.set(errMessage);
            this.view.dispatch({
                effects: [
                    this.addHighlight.of({
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
        this.removeHighlightedLines(this.view);
        const line = this.view.state.doc.line(lineNumber);
        errorMessage.set(`Invalid, ${message}`);
        if (line.text !== "") {
            this.view.dispatch({
                effects: [
                    this.addHighlight.of({
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
        this.removeHighlightedLines(this.view);
        const line = this.view.state.doc.line(lineNumber === 0 ? 1 : lineNumber);
        errorMessage.set(`Invalid, ${reason}`);
        if (line.text === "") {
            this.view.dispatch({
                effects: [
                    this.addHighlight.of({
                        from: 1,
                        to: line.to
                    })
                ]
            });
        } else {
            try {
                this.view.dispatch({
                    effects: [
                        this.addHighlight.of({
                            from: position,
                            to: line.to
                        }),
                        EditorView.scrollIntoView(line.from, { y: "nearest", x: "nearest" })
                    ]
                });
            } catch (err) {
                this.view.dispatch({
                    effects: [
                        this.addHighlight.of({
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
