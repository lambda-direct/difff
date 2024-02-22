import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Article } from "~/types";

export const load: PageLoad = async ({ params }) => {
	try {
		const data = await import(`../../../../md/articles/${params.id}.md`);

		const article = data.metadata as Article;
		return article;
	} catch (e) {
		error(404, `Could not find ${params.id}`);
	}
};
