import { EditorState, StateEffect, StateField, type Extension } from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";
import { showError } from "~/lib/storages";
import { isFormatError } from "~/utils";
import JSONDataOperations from "~/utils/index";
import { themeExtensions } from "./themes/theme";
import { basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";

export const addHighlightedLine = (view: EditorView, lineNumber: number) => {
    const line = view.state.doc.line(lineNumber);
    view.dispatch({
        effects: [
            addHighlight.of({
                from: line.from,
                to: line.to
            }),
            EditorView.scrollIntoView(line.from, { y: "nearest", x: "start" })
        ]
    });
};

export const removeHighlightedLines = (view: EditorView) => {
    view.dispatch({
        effects: [removeHighlights.of(null)]
    });
};

export const validateJson = async (value: string, view: EditorView) => {
    if (value) {
        try {
            await JSONDataOperations.format(value);
            removeHighlightedLines(view);
            showError.set(false);
            return;
        } catch (err) {
            if (isFormatError(err)) {
                addHighlightedLine(view, err.loc.start.line);
            }
            showError.set(true);
            return;
        }
    } else {
        showError.set(false);
        return;
    }
};

export const formatJSON = async (value: string, view: EditorView, isError: boolean) => {
    await validateJson(value, view);
    if (!isError && value.replaceAll(" ", "")) {
        return await JSONDataOperations.format(value);
    } else {
        return value;
    }
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

export const stateExtensions = [basicSetup, lineHighlightField, json(), themeExtensions];
