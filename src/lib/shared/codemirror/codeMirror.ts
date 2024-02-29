import { EditorState, StateEffect, StateField, type Extension } from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";
import { search } from "@codemirror/search";
import { themeExtensions } from "./themes/theme";
import { basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";
import { errorMessage, showError } from "~/lib/storages";

export const addHighlightedLineJSON = (view: EditorView, lineNumber: number) => {
    const line = view.state.doc.line(lineNumber);
    if (line.from === 0 && line.to === 0) {
        errorMessage.set("JSON");
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: 1,
                    to: 100
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
    const line = view.state.doc.line(lineNumber);
    if (line.from === 0 && line.to === 0) {
        view.dispatch({
            effects: [
                addHighlight.of({
                    from: 1,
                    to: 100
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

export const addHighlightedLineYaml = (
    // REDO
    view: EditorView,
    line: number,
    positionNumber: number,
    reason: string
) => {
    errorMessage.set(reason);
    view.dispatch({
        effects: [
            addHighlight.of({
                from: positionNumber,
                to: positionNumber + 1
            }),
            EditorView.scrollIntoView(line, { y: "nearest", x: "nearest" })
        ]
    });
    showError.set(true);
};

export const removeHighlightedLines = (view: EditorView) => {
    view.dispatch({
        effects: [removeHighlights.of(null)]
    });
    errorMessage.set("");
    showError.set(false);
};

export const createEditorState = (
    value: string | undefined,
    stateExtensions: Extension | StateField<DecorationSet>
): EditorState => {
    return EditorState.create({
        doc: value,
        extensions: [stateExtensions]
    });
};

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

const removeHighlights = StateEffect.define();

const lineHighlight = Decoration.mark({ class: "error" });

export const stateExtensions = [
    basicSetup,
    lineHighlightField,
    json(),
    themeExtensions,
    search({ top: true })
];
