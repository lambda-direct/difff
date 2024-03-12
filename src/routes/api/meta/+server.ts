import { json } from "@sveltejs/kit";
import type { Post } from "~/types";

const getPosts = async () => {
    const posts: Post[] = [];
    const paths = import.meta.glob("/src/articles/meta/*.md", { eager: true });
    for (const path in paths) {
        const file = paths[path];
        if (file && typeof file === "object" && "metadata" in file) {
            const metadata = file.metadata as Post;
            posts.push(metadata);
        }
    }
    return posts;
};

export const GET = async () => {
    const postsMeta = await getPosts();
    return json(postsMeta);
};
