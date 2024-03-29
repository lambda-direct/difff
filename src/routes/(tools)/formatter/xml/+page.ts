import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try {
        const xml = "xml";
        const data = await import(`../../../../articles/content/pages/formatters/${xml}.md`);
        return { content: data.default };
    } catch (e) {
        error(404, `Not found`);
    }
};
