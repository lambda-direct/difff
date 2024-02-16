// import { EditorView } from "codemirror";
// import { StateEffect, StateField } from "@codemirror/state";
// import { Decoration } from "@codemirror/view";

// export const addLineHighlight = StateEffect.define<{ from: number; to: number }>({
// 	map: ({ from, to }, change) => ({
// 		from: change.mapPos(from),
// 		to: change.mapPos(to),
// 	}),
// });

// const lineHighlight = Decoration.mark({ class: "bg-red-500" });

// export const lineHighlightField = StateField.define<DecorationSet>({
// 	create() {
// 		return Decoration.none;
// 	},
// 	update(lineHighlights, tr) {
// 		lineHighlights = lineHighlights.map(tr.changes);
// 		for (const e of tr.effects)
// 			if (e.is(addLineHighlight)) {
// 				lineHighlights = lineHighlights.update({
// 					add: [lineHighlight.range(e.value.from, e.value.to)],
// 				});
// 			}
// 		return lineHighlights;
// 	},
// 	provide: f => EditorView.decorations.from(f),
// });

// export const highlightLinesEffect = StateEffect.define();
// export const resetLinesHighlightEffect = StateEffect.define();

// export const highlight = StateField.define({
// 	create() {
// 		return Decoration.none;
// 	},
// 	update: function (value, tr) {
// 		value = value.map(tr.changes);
// 		for (const effect of tr.effects) {
// 			if (effect.is(highlightLinesEffect)) {
// 				value = value.update({ add: effect.value });
// 			}
// 		}
// 		return value;
// 	},
// 	provide: f => EditorView.decorations.from(f),
// });

export const styles = {
    ".cm-line": {
        "font-size": "14px",
        "min-height": "24px !important",
        "line-height": "24px !important",
        display: "flex",
        "align-items": "center"
    },
    ".cm-execLine": {
        background: "red"
    },
    ".cm-gutterElement": {
        color: "#a3a5ab70",
        "font-size": "14px !important",
        display: "flex",
        "align-items": "center",
        "justify-content": "center"
    },
    ".cm-foldGutter span": {
        padding: "0 1px 8px",
        cursor: "pointer",
        "font-size": "20px"
    },
    "::-webkit-scrollbar": {
        padding: "0",
        margin: "0",
        width: "12px",
        height: "12px"
    },
    "::-webkit-scrollbar-corner": {
        background: "#192026"
    },
    "::-webkit-scrollbar-track": {
        "border-radius": "12px",
        background: "#192026"
    },
    "::-webkit-scrollbar-thumb": {
        "border-radius": "2px",
        background: "#4c5259"
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: "#363d44"
    },
    ".cm-gutters": {
        position: "relative !important",
        background: "#202830",
        "border-right": "none",
        "flex-shrink": 0,
        display: "flex",
        height: "100%",
        "box-sizing": "border-box",
        "inset-inline-start": 0
    },
    ".cm-scroller::placeholder": {
        "font-size": "16px",
        color: "#e2e8f0a1"
    },
    ".cm-scroller": {
        height: "60vh",
        resize: "none",
        background: "#202830",
        border: "1px solid #202830",
        "border-radius": "12px"
    },
    " .cm-lineNumbers .cm-gutterElement": {
        "min-width": "24px"
    },
    ".cm-activeLineGutter": {
        background: "#f5f5f014"
    },
    ".cm-activeLine": {
        background: "#f5f5f014"
    },
    ".ͼe": {
        color: "#73ba7e"
    },
    ".ͼd": {
        color: "#6fa8dc"
    },
    ".ͼc": {
        color: "#e5bde2"
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#e1e1e1"
    },
    "&.cm-focused .cm-selectionBackground, .ͼ4 .cm-line::selection": {
        backgroundColor: "#3e4451!important"
    }
};
