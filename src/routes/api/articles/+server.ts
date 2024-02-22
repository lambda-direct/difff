import { json } from "@sveltejs/kit";
import type { Article } from "~/types";

const getPosts = async () => {
	const articles: Article[] = [];
	const paths = import.meta.glob("/src/md/articles/*.md", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (file && typeof file === "object" && "metadata" in file) {
			const metadata = file.metadata as Omit<Article, "slug">;
			const article = { ...metadata, slug };
			articles.push(article);
		}
	}
	return articles;
};

export const GET = async () => {
	const articles = await getPosts();
	return json(articles);
};
