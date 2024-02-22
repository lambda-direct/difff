<script lang="ts">
    import { page } from "$app/stores";
    import RightArrowIcon from "~/lib/icons/RightArrowIcon.svelte"
    export let data
    
</script>

<svelte:head>
    <title>{data.metadata.metaTitle}</title>
    <meta
        name="description"
        content={data.metadata.metaDescription}
    />
</svelte:head>

<header class="header">
    <nav class="navigation">
        <ul class="list">
            <li class="list_item">
                <a href="/changelog" class="list_item_ling">
                    Change & Decision log
                    <RightArrowIcon color={"#e1e1e1"}/>
                </a>
            </li>
            <li class="list_item">
                {$page.url.pathname.split("/").slice(-2).join(" ").toUpperCase()}
            </li>
        </ul>
    </nav>
</header>

<div class="blog-page">
    <svelte:component this={data.content}/>
</div>

<style>
    @import "styles.module.css";
    .list {
        display: inline-flex;
        padding: 0;
        margin: 0;
        list-style: none;
        list-style-image: none;
    } 

    .list_item_ling{
        display: flex;
        align-items: center;
    }

    .list_item{
        align-self: center;
        margin: 0 4px 0 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        color:#e1e1e1;
        &:hover{
            color: #878787
        }
    }
    
    .home-route-container{
        display: inline-flex;
        align-items: center;
        margin: 0 8px 0 0;
        color: #878787;
    }
    
    .navigation{
        display: inline-flex;
        align-items: center;
        margin: 50px 0 0;
    }
</style>