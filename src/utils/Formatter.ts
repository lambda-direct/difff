import { XMLValidator } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as prettier from "prettier/standalone";
import Converter from "~/utils/Converter";
import { prettierSettings } from "~/utils/settings";
import xmlFormat from "xml-formatter";

class Formatter {
    private format: "json" | "yaml" | "xml";
    constructor(format: "json" | "yaml" | "xml") {
        this.format = format;
    }
    private formatJson = async (
        userInput: string,
        options?: { tabWidth?: number; useTabs?: boolean }
    ) => {
        if (!options || (!options.tabWidth && !options.useTabs))
            options = { tabWidth: 4, useTabs: false };

        if (!options.tabWidth) options = { tabWidth: 4, useTabs: options.useTabs };

        if (!options.useTabs) {
            options = { tabWidth: options.tabWidth, useTabs: false };
        }
        try {
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

    private formatYaml = (userInput: string, options?: { indent: number }) => {
        if (!options) options = { indent: 2 };
        try {
            const yamlObject = yaml.load(userInput);
            const formattedYaml = yaml.dump(yamlObject, options);
            return formattedYaml;
        } catch (err) {
            return err;
        }
    };

    private formatXml = (userInput: string, spaceNum?: number) => {
        if (!spaceNum) spaceNum = 2;
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

    public formatInput = async (
        userInput: string,
        tab?: boolean,
        spaces?: number
    ): Promise<unknown> => {
        if (userInput) {
            if (this.format === "yaml") {
                const options = spaces ? { indent: spaces } : undefined;
                return this.formatYaml(userInput, options);
            }
            if (this.format === "json") {
                const options = { tabWidth: spaces, useTabs: tab };
                return await this.formatJson(userInput, options);
            }
            return this.formatXml(userInput, spaces);
        }
        return userInput;
    };
}

export default Formatter;
