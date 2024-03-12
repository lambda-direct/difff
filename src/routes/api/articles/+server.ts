import { json } from "@sveltejs/kit";
import type { Article } from "~/types";

const getPosts = async () => {
    const articles: Article[] = [];
    const paths = import.meta.glob("/src/articles/content/*.md", { eager: true });

    for (const path in paths) {
        const file = paths[path];
        if (file && typeof file === "object" && "metadata" in file) {
            const metadata = file.metadata as Article;
            articles.push(metadata);
        }
    }
    return articles;
};

export const GET = async () => {
    const articles = await getPosts();
    return json(articles);
};
