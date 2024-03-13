import axios from "axios";
import Validator from "./Validator";

export class Converter {
    static urlToJson = async (userInput: string) => {
        if (!Validator.isURL(userInput)) return userInput;
        try {
            const response = await axios.get(userInput);
            return JSON.stringify(response.data);
        } catch (err) {
            return userInput;
        }
    };
}
