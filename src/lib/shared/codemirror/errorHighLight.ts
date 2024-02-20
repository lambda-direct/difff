import { StateEffect, StateField } from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";

export const addHighlightedLine = (view: EditorView, lineNumber: number) => {
	const line = view.state.doc.line(lineNumber);
	view.dispatch({
		effects: [
			addHighlight.of({
				from: line.from,
				to: line.to,
			}),
		],
	});
};

export const removeHighlightedLines = (view: EditorView) => {
	view.dispatch({
		effects: [removeHighlights.of(null)],
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
					},
				});
			} else if (e.is(addHighlight)) {
				highlights = highlights.update({
					add: [lineHighlight.range(e.value.from, e.value.to)],
				});
			}
		}
		return highlights;
	},
	provide: f => EditorView.decorations.from(f),
});

const addHighlight = StateEffect.define<{ from: number; to: number }>({
	map: ({ from, to }, change) => ({
		from: change.mapPos(from),
		to: change.mapPos(to),
	}),
});

const removeHighlights = StateEffect.define();

const lineHighlight = Decoration.mark({ class: "error" });
