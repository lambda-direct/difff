import { EditorView } from "codemirror";
import { StateEffect, StateField } from "@codemirror/state";
import { Decoration, type DecorationSet } from "@codemirror/view";

export const addLineHighlight = StateEffect.define<{ from: number; to: number }>({
	map: ({ from, to }, change) => ({
		from: change.mapPos(from),
		to: change.mapPos(to),
	}),
});

const lineHighlight = Decoration.mark({ class: "bg-red-500" });

export const lineHighlightField = StateField.define<DecorationSet>({
	create() {
		return Decoration.none;
	},
	update(lineHighlights, tr) {
		lineHighlights = lineHighlights.map(tr.changes);
		for (const e of tr.effects)
			if (e.is(addLineHighlight)) {
				lineHighlights = lineHighlights.update({
					add: [lineHighlight.range(e.value.from, e.value.to)],
				});
			}
		return lineHighlights;
	},
	provide: f => EditorView.decorations.from(f),
});

export const highlightLinesEffect = StateEffect.define();
export const resetLinesHighlightEffect = StateEffect.define();

export const highlight = StateField.define({
	create() {
		return Decoration.none;
	},
	update: function (value, tr) {
		value = value.map(tr.changes);
		for (const effect of tr.effects) {
			if (effect.is(highlightLinesEffect)) {
				value = value.update({ add: effect.value });
			}
		}
		return value;
	},
	provide: f => EditorView.decorations.from(f),
});
