import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async () => {
    try {
        const data = await import("../../../../articles/content/yaml.md");
        return { content: data.default };
    } catch (e) {
        error(404, `Not found`);
    }
};
