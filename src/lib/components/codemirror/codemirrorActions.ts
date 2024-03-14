import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
import {
    getFileFormat,
    stateExtensions,
    updateCodemirrorValidatedValue,
    updateCodemirrorValue,
    updateFormattedValue
} from "~/lib/components/codemirror/codemirror";
import Formatter from "~/utils/Formatter";
import Validator from "~/utils/Validator";
import { getThemeExtention } from "./themes/theme";

class CodemirrorActions {
    view: EditorView;
    format: "json" | "xml" | "yaml";
    formatter: Formatter;
    validator: Validator;
    constructor(view: EditorView, format: "json" | "xml" | "yaml") {
        this.view = view;
        this.format = format;
        this.formatter = new Formatter(this.format);
        this.validator = new Validator(format);
    }

    public updateFormattedValue = async (userInput: string) => {
        updateFormattedValue(this.view, await this.formatter.formatInput(userInput));
    };

    public valueChange = async (value: string) => {
        const new_value = this.view.state.doc.toString();
        if (new_value === value) return;
        updateCodemirrorValidatedValue(this.view, await this.validator.validateInput(new_value));
        return new_value;
    };

    public dragAndDrop = (event: DragEvent, value: string) => {
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const oldValue = value;
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                updateCodemirrorValue(this.view, droppedData);
                this.updateFormattedValue(droppedData);
            };
            if (value !== oldValue) {
                this.view.dispatch({
                    effects: [EditorView.scrollIntoView(1, { y: "nearest" })]
                });
            }
            reader.readAsText(file);
        }
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

    public handleFileUpload = (
        event: Event & { currentTarget: EventTarget & HTMLInputElement }
    ) => {
        if (
            event.currentTarget &&
            event.currentTarget.files &&
            event.currentTarget.files.length > 0
        ) {
            const file = event.currentTarget.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                updateFormattedValue(this.view, droppedData);
                setTimeout(async () => {
                    this.updateFormattedValue(droppedData);
                }, 10); // REDO
            };
            reader.readAsText(file);
        }
    };
}

export const getExtentions = (format: "json" | "xml" | "yaml", placeholder: string) => {
    const fieldFormat = getFileFormat(format);
    const themeExtension = getThemeExtention(format);
    return [...stateExtensions, themeExtension, placeholderSet(placeholder), fieldFormat];
};

export default CodemirrorActions;
