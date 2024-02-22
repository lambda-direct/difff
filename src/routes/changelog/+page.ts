import type { ResponsePosts } from "~/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch("api/post");
	const posts = (await response.json()) as ResponsePosts[];
	return { posts };
};
