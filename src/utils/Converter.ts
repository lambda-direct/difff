import axios from "axios";
import { isURL } from "~/utils/helper";
import { js2xml } from "xml-js";

export class Converter {
    public urlToJson = async (userInput: string) => {
        if (!isURL(userInput)) return userInput;
        try {
            const response = await axios.get(userInput);
            return JSON.stringify(response.data);
        } catch (err) {
            return userInput;
        }
    };

    private clearTags = (xmlString: string) => {
        // todo
        return xmlString;
    };

    public jsonToXml = (json: string) => {
        try {
            const xml = js2xml(JSON.parse(json), { compact: true });

            console.log("this.clearTags(xml):", this.clearTags(xml));

            const returnedXML = `<?xml version="1.0" encoding="UTF-8"?><root>${this.clearTags(xml)}</root>`;

            return returnedXML;
        } catch (err) {
            return "";
        }
    };
}

export default new Converter();
