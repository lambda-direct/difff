import { XMLValidator } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as prettier from "prettier/standalone";
import Converter from "~/utils/Converter";
import { prettierSettings } from "~/utils/settings";
import LocalStorage from "~/storage/LocalStorage";
import xmlFormat from "xml-formatter";

class Formatter {
    private format: "json" | "yaml" | "xml";
    constructor(format: "json" | "yaml" | "xml") {
        this.format = format;
    }
    private formatJson = async (userInput: string) => {
        try {
            const storage = LocalStorage.get("json");
            const options = {
                tabWidth: storage ? storage.spaces : 4,
                useTabs: storage && "tab" in storage ? storage.tab : false
            };
            const originalCode = await Converter.urlToJson(userInput);
            const formattedResult = await prettier.format(originalCode, {
                ...prettierSettings,
                ...options
            });

            if (originalCode === formattedResult) return originalCode;

            return formattedResult;
        } catch (err) {
            return err;
        }
    };

    private formatYaml = (userInput: string) => {
        const storage = LocalStorage.get("yaml");
        const options = { indent: storage ? storage.spaces : 2 };
        try {
            const yamlObject = yaml.load(userInput);
            const formattedYaml = yaml.dump(yamlObject, options);
            return formattedYaml;
        } catch (err) {
            return err;
        }
    };

    private formatXml = (userInput: string) => {
        const storage = LocalStorage.get("xml");
        const spaceNum: number = storage ? storage.spaces : 2;
        if (userInput) {
            const validationResult = XMLValidator.validate(userInput, {
                allowBooleanAttributes: true
            });

            if (validationResult === true) {
                const options = { indentation: " ".repeat(spaceNum) };
                const formattedXML = xmlFormat(userInput, options);
                return formattedXML;
            } else {
                return validationResult;
            }
        } else {
            return userInput;
        }
    };

    public formatInput = async (userInput: string) => {
        if (this.format === "yaml") {
            return this.formatYaml(userInput);
        }
        if (this.format === "json") {
            return await this.formatJson(userInput);
        }
        if (this.format === "xml") {
            return this.formatXml(userInput);
        }
    };
}

export default Formatter;
