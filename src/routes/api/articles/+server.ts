import { json } from "@sveltejs/kit";
import type { Post } from "~/types";

const getPosts = async () => {
	const posts: Post[] = [];
	const paths = import.meta.glob("/src/md/articles/*.md", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".md", "");

		if (file && typeof file === "object" && "metadata" in file) {
			const metadata = file.metadata as Omit<Post, "slug">;
			const post = { ...metadata, slug };
			posts.push(post);
		}
	}
	return posts;
};

export const GET = async () => {
	const post = await getPosts();
	return json(post);
};
