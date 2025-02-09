import OpenAI from "openai";
import { OPENAI_key } from "./constants";
const openai = new OpenAI({
    apiKey:OPENAI_key,
    dangerouslyAllowBrowser:true, 
});
export default openai;