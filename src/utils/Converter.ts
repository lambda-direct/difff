import axios from "axios";
import { isURL } from "~/utils/helper";

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
}

export default new Converter();
