import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    try {
        const json = "json";
        const data = await import(`../../../../articles/content/pages/minifiers/${json}.md`);
        return { content: data.default };
    } catch (e) {
        error(404, `Not found`);
    }
};
