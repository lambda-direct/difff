<script lang="ts">
    import RightArrowIcon from "~/lib/icons/RightArrowIcon.svelte";
    export let data;
</script>

<svelte:head>
    <title>{data.metadata.metaTitle}</title>
    <meta name="description" content={data.metadata.metaDescription} />
</svelte:head>

<header class="header">
    <nav class="navigation">
        <ul class="list">
            <li class="list_item">
                <a href="/changelog" class="list_item_link"> Change & Decision log </a>
                <RightArrowIcon color={"#e1e1e1"} />
            </li>
            <li class="list_item" class:list_item_link-active={true}>
                {data.metadata.data}
            </li>
        </ul>
    </nav>
</header>

<div class="blog-page">
    <svelte:component this={data.content} />
</div>

<style>
    @import "styles.module.css";
    .list {
        display: inline-flex;
        padding: 0;
        margin: 0;
        list-style: none;
        list-style-image: none;
        gap: 8px;
    }

    .list_item {
        display: flex;
        align-items: center;
        margin: 0;
        font-weight: 500;
        font-size: 14px;
        color: #e1e1e1;
        gap: 8px;
    }

    .list_item_link {
        display: flex;
        align-items: center;
        &:hover {
            color: #878787;
        }
    }

    .list_item_link-active {
        color: #ababab;
    }

    .navigation {
        display: inline-flex;
        align-items: center;
        margin: 50px 0 0;
    }
</style>
