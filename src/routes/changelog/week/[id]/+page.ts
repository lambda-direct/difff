import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Article } from "~/types";

export const load: PageLoad = async ({ params }) => {
	try {
		const data = await import(`../../../../md/articles/${params.id}.md`);

		return { metadata: data.metadata as Article, content: data.default };
	} catch (e) {
		error(404, `Could not find ${params.id}`);
	}
};
