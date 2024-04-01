import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try {
        const js = "js";
        const data = await import(`../../../../articles/content/pages/minifiers/${js}.md`);
        return { content: data.default };
    } catch (e) {
        error(404, `Not found`);
    }
};
