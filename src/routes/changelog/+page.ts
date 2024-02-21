import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch("api/post");
	const posts: unknown = await response.json();
	console.log("posts:", posts);
	return { posts };
};
