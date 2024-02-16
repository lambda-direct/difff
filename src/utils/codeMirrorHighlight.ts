// import { EditorState, StateField, StateEffect } from "@codemirror/state";
// import { EditorView, Decoration } from "@codemirror/view";
// import { json } from "@codemirror/lang-json";

// const addLineHighlight = StateEffect.define<number>();

// const lineHighlightField = StateField.define({
// 	create() {
// 		return Decoration.none;
// 	},
// 	update(value, tr) {
// 		if (tr.docChanged) {
// 			value = Decoration.none;
// 		}
// 		for (const e of tr.effects) {
// 			if (e.is(addLineHighlight)) {
// 				value = value.update({ add: [lineHighlightMark.range(e.value)] });
// 			}
// 		}
// 		return value;
// 	},
// 	provide: f => EditorView.decorations.from(f),
// });

// const lineHighlightMark = Decoration.line({
// 	attributes: { style: "background-color: #d2ffff" },
// });

// export default class HighlightableEditor {
// 	editorView: EditorView;
// 	constructor(parent: any, code: any, onHighlight: (arg0: number) => void) {
// 		this.editorView = new EditorView({
// 			state: EditorState.create({
// 				doc: code,
// 				extensions: [lineHighlightField, json()],
// 			}),
// 			parent: parent,
// 		});

// 		this.editorView.dom.addEventListener("mousemove", event => {
// 			const lastMove = {
// 				x: event.clientX,
// 				y: event.clientY,
// 				target: event.target,
// 				time: Date.now(),
// 			};
// 			const pos = this.editorView.posAtCoords(lastMove);
// 			const lineNo = this.editorView.state.doc.lineAt(pos).number;
// 			const docPosition = this.editorView.state.doc.line(lineNo).from;
// 			this.editorView.dispatch({ effects: addLineHighlight.of(docPosition) });
// 			onHighlight(lineNo);
// 		});
// 	}

// 	getCode() {
// 		return this.editorView.state.doc.toString();
// 	}

// 	highlightLine(lineNo: number) {
// 		if (lineNo <= 0) return;
// 		const docPosition = this.editorView.state.doc.line(lineNo).from;
// 		this.editorView.dispatch({ effects: addLineHighlight.of(docPosition) });
// 	}
// }
