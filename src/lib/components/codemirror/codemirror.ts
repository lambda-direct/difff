import {
    EditorState,
    SelectionRange,
    StateEffect,
    StateField,
    type Extension
} from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";
import { errorMessage, showError } from "~/lib/storages";
import * as xmlMode from "@codemirror/legacy-modes/mode/xml";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import { search } from "@codemirror/search";
import { basicSetup } from "codemirror";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { json } from "@codemirror/lang-json";
import { isJSONError, isXMLError, isYamlError } from "~/utils/helper";
import { addHighlightedLineJSON } from "~/lib/components/codemirror/highlightJSON";
import { addHighlightedLineYaml } from "~/lib/components/codemirror/highlightYAML";
import { highlightErrorLineXML } from "~/lib/components/codemirror/highlightXML";

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

export const stateExtensions = [
    EditorView.lineWrapping,
    basicSetup,
    lineHighlightField,
    search({ top: true })
];

const removeHighlights = StateEffect.define();
export const removeHighlightedLines = (view: EditorView) => {
    view.dispatch({
        effects: [removeHighlights.of(null)]
    });
    errorMessage.set("");
    showError.set(false);
};

const lineHighlight = Decoration.mark({ class: "error" });
export const addHighlight = StateEffect.define<{ from: number; to: number }>({
    map: ({ from, to }, change) => ({
        from: change.mapPos(from),
        to: change.mapPos(to)
    })
});

export const getFileFormat = (
    format: "json" | "yaml" | "xml"
): LanguageSupport | StreamLanguage<unknown> => {
    if (format === "json") return json();
    if (format === "yaml") return StreamLanguage.define(yamlMode.yaml);
    return StreamLanguage.define(xmlMode.xml);
};

export const trackCursorPosition = (editorView: EditorView): { line: number; col: number } => {
    const { doc, selection } = editorView.state;
    const mainRange: SelectionRange = selection.main;

    const lineInfo = doc.lineAt(mainRange.head);
    const line = lineInfo.number;
    const col = mainRange.head - lineInfo.from;

    return { line, col };
};

export const updateCodemirrorValue = (view: EditorView, input: string) => {
    const { state } = view;
    const selection = state.selection.main;

    const transition = state.update({
        changes: { from: 0, to: view.state.doc.length, insert: input }
    });
    view.dispatch({
        ...transition,
        selection: { anchor: selection.anchor, head: selection.anchor }
    });
};

export const updateFormattedValue = (view: EditorView, value: unknown) => {
    if (typeof value === "string") {
        removeHighlightedLines(view);
        updateCodemirrorValue(view, value);
    } else {
        if (isJSONError(value)) {
            addHighlightedLineJSON(
                view,
                value.loc.start.column,
                value.loc.start.line,
                value.message
            );
            return;
        }
        if (isYamlError(value)) {
            addHighlightedLineYaml(view, value.mark.position, value.mark.line, value.reason);
            return;
        }
        if (isXMLError(value)) {
            highlightErrorLineXML(view, value.err.line, value.err.msg);
            return;
        }
    }
};

export const updateCodemirrorValidatedValue = (view: EditorView, value: unknown) => {
    let isError: boolean = false;
    showError.subscribe((el) => (isError = el));
    if (typeof value === "boolean" && isError) {
        removeHighlightedLines(view);
    }
    if (typeof value !== "boolean") {
        if (isJSONError(value)) {
            addHighlightedLineJSON(
                view,
                value.loc.start.column,
                value.loc.start.line,
                value.message
            );
            return;
        }
        if (isXMLError(value)) {
            highlightErrorLineXML(view, value.err.line, value.err.msg);
            return;
        }
        if (isYamlError(value)) {
            addHighlightedLineYaml(view, value.mark.position, value.mark.line, value.reason);
            return;
        }
    }
};
