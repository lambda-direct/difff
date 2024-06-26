import { EditorState, SelectionRange, StateField, type Extension } from "@codemirror/state";
import { EditorView, placeholder as placeholderSet, type DecorationSet } from "@codemirror/view";
import { getThemeExtention } from "~/lib/shared/Codemirror/themes/theme";
import { foldGutter, StreamLanguage, type LanguageSupport } from "@codemirror/language";
import { json } from "@codemirror/lang-json";
import * as xmlMode from "@codemirror/legacy-modes/mode/xml";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import * as sqlMode from "@codemirror/legacy-modes/mode/sql";
import { basicSetup } from "codemirror";
import {
    closeSearchPanel,
    openSearchPanel,
    SearchQuery,
    setSearchQuery,
    findNext,
    findPrevious,
    replaceNext,
    replaceAll,
    selectMatches
} from "@codemirror/search";
import type { CursorPosition, Formats, SearchData } from "~/types";
import { getErrorLine, isJSONError, isXMLError, isYamlError } from "~/utils/helper";
import Highlight, {
    lineHighlightField,
    removeHighlightedLines
} from "~/lib/shared/Codemirror/Highlight";
import { errorMessage, isSearchOpen, showError } from "~/storage/store";
import Validator from "~/utils/Validator";
import { javascript } from "@codemirror/lang-javascript";
import CloseIcon from "~/lib/icons/gutter/DropDownClosed.svelte";
import OpenIcon from "~/lib/icons/gutter/DropDownOpen.svelte";

class Codemirror {
    view: EditorView;
    element: HTMLDivElement;
    outerValueChange: (newValue: string, cursorPos: CursorPosition) => void;
    placeholder: string;
    label: string;
    format: Formats;
    highlighter: Highlight;
    validator: Validator;
    readOnly: boolean;
    constructor({
        element,
        outerValueChange,
        placeholder,
        format,
        label,
        readOnly
    }: {
        element: HTMLDivElement;
        outerValueChange: (newValue: string, cursorPos: CursorPosition) => void;
        placeholder: string;
        label: string;
        format: Formats;
        readOnly: boolean;
    }) {
        this.element = element;
        this.outerValueChange = outerValueChange;
        this.placeholder = placeholder;
        this.label = label;
        this.format = format;
        this.readOnly = readOnly;
        this.view = this.init(element);
        this.validator = new Validator(format);
        this.highlighter = new Highlight(this.view);
    }

    private getFileFormat = (format: Formats): LanguageSupport | StreamLanguage<unknown> => {
        if (format === "js") return javascript();
        if (format === "json") return json();
        if (format === "yaml") return StreamLanguage.define(yamlMode.yaml);
        if (format === "sql") return StreamLanguage.define(sqlMode.standardSQL);
        return StreamLanguage.define(xmlMode.xml);
    };

    private getGuttersFold = () => {
        const foldOptions = foldGutter({
            markerDOM: (open) => {
                const icon = document.createElement("div");
                icon.style.display = "flex";
                icon.style.alignItems = "center";
                icon.style.justifyContent = "center";
                icon.style.minWidth = "18px";
                icon.style.minHeight = "18px";
                if (open) new OpenIcon({ target: icon });
                if (!open) new CloseIcon({ target: icon });
                return icon;
            }
        });
        return foldOptions;
    };

    private getExtentions = () => {
        const fieldFormat = this.getFileFormat(this.format);
        const themeExtension = getThemeExtention(this.format);
        const gutterElements = this.getGuttersFold();
        return [
            EditorView.contentAttributes.of({ "aria-label": `${this.label}` }),
            EditorView.lineWrapping,
            EditorState.readOnly.of(this.readOnly),
            basicSetup,
            gutterElements,
            lineHighlightField,
            themeExtension,
            placeholderSet(this.placeholder),
            fieldFormat
        ];
    };

    private createEditorState = (
        value: string,
        stateExtensions: Extension | StateField<DecorationSet>
    ): EditorState => {
        return EditorState.create({
            doc: value,
            extensions: [stateExtensions]
        });
    };

    public init = (element: HTMLDivElement) => {
        const extentions = this.getExtentions();
        return new EditorView({
            parent: element,

            state: this.createEditorState("", extentions),
            dispatch: async (transaction) => {
                this.view.update([transaction]);
                if (transaction.selection || transaction.docChanged) {
                    const docValue = this.view.state.doc.toString();
                    this.validateInput(await this.validator.validate(docValue));
                    this.outerValueChange(docValue, this.trackCursorPosition());
                }
            },
            extensions: [extentions]
        });
    };

    public updateCodemirrorValue = (input: string) => {
        const { state } = this.view;
        const selection = state.selection.main;

        const transition = state.update({
            changes: { from: 0, to: state.doc.length, insert: input }
        });

        this.view.dispatch(transition);
        if (input.length > 0 && state.doc.length >= selection.anchor) {
            this.view.dispatch({
                selection: { anchor: selection.anchor, head: selection.anchor },
                scrollIntoView: true
            });
        }
    };

    public trackCursorPosition = (): { line: number; col: number } => {
        const { doc, selection } = this.view.state;
        const mainRange: SelectionRange = selection.main;
        const lineInfo = doc.lineAt(mainRange.head);
        const line = lineInfo.number;
        const col = mainRange.head - lineInfo.from;

        return { line, col };
    };

    public setFormattingResult = (value: unknown) => {
        if (typeof value === "string") {
            errorMessage.set("");
            showError.set(false);
            this.updateCodemirrorValue(value);
        } else {
            showError.set(true);
        }
    };

    public formatInput = async (userInput: string) => {
        if (userInput) this.setFormattingResult(userInput);
    };

    public validateInput = async (validationResult: unknown) => {
        if (validationResult) this.setValidationResult(validationResult);
    };

    private setValidationResult = (value: unknown) => {
        let isError: boolean = false;
        removeHighlightedLines(this.view);
        showError.subscribe((el) => (isError = el));
        if (typeof value === "boolean" && isError) {
            errorMessage.set("");
            showError.set(false);
        }
        if (typeof value !== "boolean") {
            if (isJSONError(value)) {
                this.highlighter.highlightErrorJSON(value.loc.start.line, value.message);
                return;
            }
            if (isXMLError(value)) {
                this.highlighter.highlightErrorXML(value.err.line, value.err.msg);
                return;
            }
            if (isYamlError(value)) {
                this.highlighter.highlightErrorYAML(value.mark.line, value.reason);
                return;
            }
        }
        if (value instanceof Error) {
            const line = getErrorLine(value);
            this.highlighter.highlightErrorLine(line);
        }
    };

    public scrollToTop = () => {
        this.view.dispatch({
            effects: [EditorView.scrollIntoView(1, { y: "nearest" })]
        });
    };

    public downloadFile = (value: string) => {
        const blob = new Blob([value], { type: `application/${this.format}` });
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = `data.${this.format}`;
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    };

    public destroy = () => {
        this.view?.destroy();
    };

    public performSearch = (searchData: SearchData) => {
        const searchOptions = new SearchQuery(searchData);
        openSearchPanel(this.view);
        this.view.dispatch({ effects: setSearchQuery.of(searchOptions) });
    };

    public nextSearchValue = () => {
        findNext(this.view);
    };

    public previousSearchValue = () => {
        findPrevious(this.view);
    };

    public selectAllMatches = () => {
        selectMatches(this.view);
    };

    public replace = () => {
        replaceNext(this.view);
    };

    public replaceAll = () => {
        replaceAll(this.view);
    };

    public closeSearch = () => {
        isSearchOpen.set(false);
        closeSearchPanel(this.view);
    };
}

export default Codemirror;
