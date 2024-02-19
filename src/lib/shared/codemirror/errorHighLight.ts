import { StateEffect, StateField } from "@codemirror/state";
import { Decoration, EditorView, type DecorationSet } from "@codemirror/view";

export const addLineHighlight = StateEffect.define<{ line: number }>({
	map: ({ line }, change) => ({
		line: change.mapPos(line),
	}),
});

export const lineHighlight = Decoration.mark({ class: "error" });

export const highlightLine = (lineNumber: number, view: EditorView) => {
	lineNumber = lineNumber > 2 ? lineNumber - 1 : lineNumber;
	const lineHighlightField = StateField.define<DecorationSet>({
		create() {
			return Decoration.none;
		},
		update(lineHighlights, tr) {
			const hasErrors = tr.effects.some(effect => effect.is(addLineHighlight));

			if (hasErrors) {
				for (const e of tr.effects) {
					if (e.is(addLineHighlight)) {
						const line = e.value.line;
						lineHighlights = lineHighlights.update({
							add: [lineHighlight.range(view.state.doc.line(line).from, view.state.doc.line(line).to)],
						});
					}
				}
			} else {
				// No errors, clear decorations
				lineHighlights = Decoration.none;
			}
			return lineHighlights;
		},
		provide: f => EditorView.decorations.from(f),
	});
	view.dispatch({
		effects: [
			StateEffect.appendConfig.of([lineHighlightField]),
			addLineHighlight.of({
				line: lineNumber,
			}),
		],
	});
};
