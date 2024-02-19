import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export const baseTheme: Extension = EditorView.baseTheme({
	".cm-scroller": {
		marginLeft: "12px",
		paddingRight: "12px",

		"&:focus": {
			outline: "none",
		},
	},
	".cm-selectionMatch": {
		background: "#2945938a !important",
	},
	"@media (max-width: 768px)": {
		".cm-content": {
			"white-space": "pre-wrap",
			overflow: "auto",
		},
	},
	"::-webkit-scrollbar": {
		padding: "0",
		margin: "0",
		width: "12px",
		height: "12px",
	},
	"::-webkit-scrollbar-corner": {
		background: "#1c1f28",
	},
	"::-webkit-scrollbar-track": {
		"border-radius": "2px",
		background: "#1c1f28",
	},
	"::-webkit-scrollbar-thumb": {
		"border-radius": "2px",
		background: "#353840",
	},
	"::-webkit-scrollbar-thumb:hover": {
		background: "#363d44",
	},
	".cm-tooltip-lint": {
		display: "flex",
		alignItems: "center",
		borderRadius: "0.375rem",
		minHeight: "26px",
		border: "none !important",
		padding: "3px 6px 3px 8px !important",
		fontSize: "12.8px",
		lineHeight: "1rem",
	},
	".cm-content ::selection": {
		background: "transparent !important",
	},
	".cm-tooltip-below": {
		borderRadius: "0.375rem",
		border: "none !important",
	},
	".cm-diagnostic": {
		paddingLeft: "20px !important",
		backgroundRepeat: "no-repeat",
		backgroundPositionX: "2px",
		backgroundPositionY: "center",
	},
	".cm-diagnostic-error": {
		backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z' fill='%23d11'/%3E %3C/svg%3E")`,
		border: "none !important",
	},
	".cm-content": {
		fontFamily: "var(--editor-font)",
		fontSize: "14.2px",
		cursor: "text",
		padding: "12px 0",
	},
	".cm-focused": {
		outline: "none !important",
	},
	".cm-gutters": {
		fontFamily: "var(--editor-font)",
		border: "none",
	},
	".cm-activeLine": {
		borderTopRightRadius: "0.375rem",
		borderBottomRightRadius: "0.375rem",
	},
	".cm-placeholder": {
		color: "#888",
		display: "inline-block",
		"vertical-align": "baseline",
	},
	".cm-gutter:first-child .cm-activeLineGutter": {
		borderTopLeftRadius: "0.375rem",
		borderBottomLeftRadius: "0.375rem",
	},
	".cm-lineNumbers .cm-gutterElement": {
		fontSize: "12.8px",
		padding: "0",

		"&:not(:first-child)": {
			padding: "4px 0 0",
		},
	},
	".cm-gutter-lint .cm-gutterElement": {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	".cm-foldGutter .cm-gutterElement": {
		display: "flex",
		alignItems: "center",

		"& > div": {
			minWidth: "20px",
			minHeight: "20px",
			cursor: "pointer",

			"&:hover": {
				background: "var(--fold-gutter-hover, #f5f5f014)",
				borderRadius: "0.25rem",
			},
		},
	},
	".cm-line": {
		minHeight: "24px !important",
		lineHeight: "24px !important",
	},
	".cm-gutter": {
		overflow: "visible",
	},
	".cm-lint-marker-error": {
		backgroundColor: "#d11",
		borderRadius: "50%",
		width: "0.5rem !important",
		height: "0.5rem !important",
		content: "'' !important",
	},

	".cm-tooltip-lint, :host & .cm-tooltip-lint": {
		display: "flex",
		backgroundColor: "var(--tooltip-background, #21252b)",
		alignItems: "center",
		borderRadius: "0.375rem",
		minHeight: "26px",
		border: "none !important",
		padding: "3px 6px 3px 8px !important",
		fontSize: "12.8px",
		lineHeight: "1rem",
	},
	".cm-tooltip-below, :host & .cm-tooltip-below": {
		borderRadius: "0.375rem",
		border: "none !important",
	},
	".cm-diagnostic, :host & .cm-diagnostic": {
		paddingLeft: "20px !important",
		backgroundRepeat: "no-repeat",
		backgroundPositionX: "2px",
		backgroundPositionY: "center",
	},
	".cm-diagnostic-error, :host & .cm-diagnostic-error": {
		backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z' fill='%23d11'/%3E %3C/svg%3E")`,
		border: "none !important",
	},
});
