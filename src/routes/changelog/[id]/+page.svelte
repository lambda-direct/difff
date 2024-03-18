<script lang="ts">
    import { page } from "$app/stores";
    import Head from "~/lib/shared/Head.svelte";
    import RightArrowIcon from "~/lib/icons/RightArrowIcon.svelte";

    export let data;

    const formattedDate = (inputDate: string) => {
        const [day, month, year] = inputDate.split("-");
        return new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };
</script>

<Head
    title={data.metadata.metaTitle}
    description={data.metadata.metaDescription}
    openGraph={{ type: "article", locale: "en_US" }}
/>

<section class="wrapper">
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
    <article class="article_style">
        <svelte:component this={data.content} />
    </article>
</section>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .article_style {
        max-width: 680px;
        margin: 0 auto;
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
