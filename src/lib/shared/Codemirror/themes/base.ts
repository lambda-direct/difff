import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export const baseTheme: Extension = EditorView.baseTheme({
    ".cm-scroller": {
        marginLeft: "12px",
        paddingRight: "12px",

        "&:focus": {
            outline: "none"
        }
    },
    ".cm-selectionMatch": {
        background: "#2945938a !important"
    },
    ".cm-searchMatch": {
        background: "#623315 !important"
    },
    ".cm-searchMatch-selected": { background: "#9E6A03 !important" },
    "@media (max-width: 768px)": {
        ".cm-content": {
            "white-space": "pre-wrap",
            overflow: "auto"
        }
    },
    ".cm-panels": {
        background: "transparent !important"
    },
    ".cm-search": {
        display: "none"
        // display: "grid",
        // "grid-template-columns": "repeat(3, 100px)",
        // position: "absolute !important",
        // top: "0px",
        // right: "0px",
        // margin: "8px !important",
        // padding: "16px !important",
        // background: "#040b1a !important",
        // "border-radius": "6px",
        // border: "1px solid #313345 !important",
        // color: "#e1e1e1"
    },

    ".cm-panels.cm-panels-top": {
        "z-index": "10",
        border: "none !important"
    },
    ".cm-textfield": {
        margin: "4px !important",
        padding: "3px 5px !important",
        "border-radius": "4px",
        border: "1px solid #4e5279 !important",
        "line-height": "120%"
    },
    ".cm-textfield[name=search]": {
        "grid-column-start": 1,
        "grid-column-end": 4,
        "grid-row-start": 1
    },
    ".cm-textfield[name=replace]": {
        "grid-column-start": 1,
        "grid-column-end": 3,
        "grid-row-start": 4
    },
    ".cm-button[name=replace]": {
        "grid-column-start": 1,
        "grid-row-start": 5
    },
    ".cm-button[name=replaceAll]": {
        "grid-column-start": 2,
        "grid-row-start": 5
    },
    ".cm-textfield:focus-visible": {
        border: "1px solid #4e5279 !important",
        outline: "1px solid #4e5279 !important"
    },
    ".cm-button": {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        height: "20px",
        margin: "4px !important",
        padding: "0",
        background: "#040b1a",
        border: "1px solid #313345",
        "border-radius": "4px",
        transition: "all 0.2s",
        "line-height": "120%",
        color: "#7d8799",
        "&:hover": {
            background: "#040f1e",
            color: "#e1e1e1"
        }
    },
    ".cm-panel.cm-search [name=close]": {
        color: "#e1e1e1",
        padding: "1px 4px"
    },
    ".cm-panel.cm-search label": {
        display: "inline-flex",
        "align-items": "center",
        "justify-content": "center",
        margin: "4px !important",
        color: "#7d8799",
        cursor: "pointer",
        "user-select": "none",
        "&:hover": {
            color: "#e1e1e1"
        }
    },

    ".cm-panel.cm-search input[type=checkbox]": {
        "border-radius": "2px !important",
        border: "1px solid #313345",
        cursor: "pointer",
        width: "12px",
        height: "12px",
        appearance: "none",
        "accent-color": "#2a3c53",
        margin: "0 4px"
    },

    ".cm-panel.cm-search input[type=checkbox]:checked": {
        "border-radius": "2px !important",
        border: "1px solid #2a3c53",
        cursor: "pointer",
        width: "12px",
        height: "12px",
        appearance: "auto",
        "accent-color": "#2a3c53",
        margin: "0 4px"
    },
    "::-webkit-scrollbar": {
        padding: "0",
        margin: "0",
        width: "12px",
        height: "12px"
    },
    "::-webkit-scrollbar-corner": {
        background: "#1c1f28"
    },
    "::-webkit-scrollbar-track": {
        "border-radius": "2px",
        background: "#1c1f28"
    },
    "::-webkit-scrollbar-thumb": {
        "border-radius": "2px",
        background: "#353840"
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: "#363d44"
    },
    ".cm-tooltip-lint": {
        display: "flex",
        alignItems: "center",
        borderRadius: "0.375rem",
        minHeight: "26px",
        border: "none !important",
        padding: "3px 6px 3px 8px !important",
        fontSize: "12.8px",
        lineHeight: "1rem"
    },
    ".cm-content ::selection": {
        background: "transparent !important"
    },
    ".cm-tooltip-below": {
        borderRadius: "0.375rem",
        border: "none !important"
    },
    ".cm-diagnostic": {
        paddingLeft: "20px !important",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "2px",
        backgroundPositionY: "center"
    },
    ".cm-diagnostic-error": {
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z' fill='%23d11'/%3E %3C/svg%3E")`,
        border: "none !important"
    },
    ".cm-content": {
        padding: "12px 0",
        fontFamily: `"JetBrains Mono", monospace`,
        fontSize: "14px",
        cursor: "text"
    },
    span: {
        fontSize: "14px",
        display: "inline-block",
        minHeight: "18px !important",
        lineHeight: "18px !important"
    },
    ".cm-focused": {
        outline: "none !important"
    },
    ".cm-gutters": {
        fontFamily: `"JetBrains Mono", monospace`,
        border: "none"
    },
    ".cm-foldGutter": {
        "user-select": "none"
    },
    ".cm-activeLine": {
        borderTopRightRadius: "0.375rem",
        borderBottomRightRadius: "0.375rem"
    },
    ".cm-placeholder": {
        color: "#888",
        display: "inline-block",
        "vertical-align": "baseline"
    },
    ".cm-gutter:first-child .cm-activeLineGutter": {
        borderTopLeftRadius: "0.375rem",
        borderBottomLeftRadius: "0.375rem"
    },
    ".cm-lineNumbers .cm-gutterElement": {
        fontSize: "12.8px",
        padding: "0",
        "user-select": "none",
        cursor: "default",
        "&:not(:first-child)": {
            display: "flex",
            "align-items": "center",
            "justify-content": "flex-end",
            padding: "0 0 0 4px"
        }
    },
    ".cm-gutter-lint .cm-gutterElement": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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
                borderRadius: "0.25rem"
            }
        }
    },
    ".cm-line": {
        minHeight: "18px !important",
        lineHeight: "18px !important"
    },
    ".cm-gutter": {
        overflow: "visible"
    },
    ".cm-lint-marker-error": {
        backgroundColor: "#d11",
        borderRadius: "50%",
        width: "0.5rem !important",
        height: "0.5rem !important",
        content: "'' !important"
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
        lineHeight: "1rem"
    },
    ".cm-tooltip-below, :host & .cm-tooltip-below": {
        borderRadius: "0.375rem",
        border: "none !important"
    },
    ".cm-diagnostic, :host & .cm-diagnostic": {
        paddingLeft: "20px !important",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "2px",
        backgroundPositionY: "center"
    },
    ".cm-diagnostic-error, :host & .cm-diagnostic-error": {
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z' fill='%23d11'/%3E %3C/svg%3E")`,
        border: "none !important"
    }
});
