<script lang="ts">
    import { page } from "$app/stores";
    import RightArrowIcon from "~/lib/icons/RightArrowIcon.svelte";
    import { formattedDate } from "~/utils/helpers.js";

    export let data;
</script>

<svelte:head>
    <title>{data.metadata.metaTitle}</title>
    <meta name="description" content={data.metadata.metaDescription} />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content="content" />
    <meta name="twitter:title" content="Post" />
    <meta name="twitter:image" content="https://site.com/past.png" />
    <meta name="twitter:site" content="@sitename" />

    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://difff.app/changelog/10-02-2024" />
    <meta property="og:title" content="SEO for beginners." />

    <meta property="og:image" content="https://site.com/post.jpg" />
    og: image – an image displayed in social media. It is very important to fill this tag.

    <meta
        property="og:description"
        content="Get FREE SEO report by 100+ parameters with the best website checker. Detailed site auditing will help to find errors in meta tags, images, links. Step-by-step guides for correcting any error and growing SEO score. The average time of site auditing is 15 seconds. Free use regardless of the number of website review."
    />
    og: description – your post description – 1-2 sentences displaying the essence. Use as short, succinct
    and attractive description of your content as possible.
</svelte:head>

<section class="article">
    <header class="header">
        <nav class="navigation">
            <ul class="list">
                <li class="list_item">
                    <a href="/changelog" class="list_item_link"> Change & Decision log</a>
                    <RightArrowIcon color={"#e1e1e1"} />
                </li>
                <li class="list_item" class:list_item_link-active={true}>
                    {formattedDate($page.params.id)}
                </li>
            </ul>
        </nav>
    </header>
    <article class="blog_page">
        <svelte:component this={data.content} />
    </article>
</section>

<style>
    @import "styles.module.css";

    .article {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header {
        @media (min-width: 768px) {
            min-width: 680px;
        }
    }

    .navigation {
        display: inline-flex;
        align-items: center;
        margin: 50px 0 0;
    }

    .list {
        display: inline-flex;
        padding: 0;
        margin: 0;
        gap: 8px;
        list-style: none;
        list-style-image: none;
    }

    .list_item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        font-weight: 500;
        font-size: 14px;
        color: #b4b4b4;
    }

    .list_item_link {
        display: flex;
        align-items: center;
        &:hover {
            color: #ededed;
        }
    }

    .list_item_link-active {
        color: #ededed;
    }
</style>
