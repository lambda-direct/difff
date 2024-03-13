import { EditorState, StateEffect, StateField, type Extension } from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";
import { errorMessage, showError } from "~/lib/storages";

import { search } from "@codemirror/search";
import { basicSetup } from "codemirror";

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

export const addHighlight = StateEffect.define<{ from: number; to: number }>({
    map: ({ from, to }, change) => ({
        from: change.mapPos(from),
        to: change.mapPos(to)
    })
});

export const updateCodemirror = (view: EditorView, newValue: string) => {
    const transition = view.state.update({
        changes: { from: 0, to: view.state.doc.length, insert: newValue }
    });

    view.dispatch(transition);
};

const removeHighlights = StateEffect.define();

const lineHighlight = Decoration.mark({ class: "error" });

export const stateExtensions = [
    EditorView.lineWrapping,
    basicSetup,
    lineHighlightField,
    search({ top: true })
];