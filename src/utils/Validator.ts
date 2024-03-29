import { XMLValidator, type ValidationError } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as prettier from "prettier/standalone";
import { prettierJSSettings, prettierSettings } from "~/utils/settings";
import type { Formats } from "~/types";

class Validator {
    format: Formats;
    constructor(format: Formats) {
        this.format = format;
    }

    private validateYAML = (input: string): true | unknown => {
        try {
            yaml.load(input);
            return true;
        } catch (err) {
            return err;
        }
    };

    private validateXML = (input: string): true | ValidationError => {
        const validationResult = XMLValidator.validate(input);
        if (validationResult === true) {
            return validationResult;
        } else {
            return validationResult;
        }
    };

    private validateJSON = (input: string): true | unknown => {
        return prettier
            .format(input, prettierSettings)
            .then(() => {
                return true;
            })
            .catch((err) => {
                return err;
            });
    };

    private validateJS = (input: string): true | unknown => {
        return prettier
            .format(input, prettierJSSettings)
            .then(() => {
                return true;
            })
            .catch((err) => {
                return err;
            });
    };

    public validate = (userInput: string) => {
        if (this.format === "json") {
            return this.validateJSON(userInput);
        }
        if (this.format === "xml") {
            return this.validateXML(userInput);
        }
        if (this.format === "yaml") {
            return this.validateYAML(userInput);
        }
        if (this.format === "js") {
            return this.validateJS(userInput);
        }
    };
}

export default Validator;
