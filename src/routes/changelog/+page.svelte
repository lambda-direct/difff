<script lang="ts">
    import "~/styles/index.css";
    import { formattedDate } from "~/utils/index.js";

    export let data 
    const {posts} = data
    
</script>

<svelte:head>
    <title>Difff Change & Decision log</title>
    <meta
        name="description"
        content="Latest features, improvements, and fixes we’ve implemented."
    />
</svelte:head>

<header class="header">
    <h1 class="title">Change & Decision log</h1>
    <h2 class="subtitle">
        Stay in the loop with the latest features, improvements, and fixes we’ve implemented in
        <a
            href="/"
            class="diff_link">
            Difff.app
        </a>
    </h2>
</header>
<ul class="list">
    {#each posts as post}
        <li class="list_element">
            <a class="week-content" href={`changelog/${post.date}`} >
                <p class="week-num">{formattedDate(post.date)}</p>
                <div class="vertical-line"/>
                <div class="post-info">
                    <p class="post-title">{post.title}</p>
                    <p class="post-description">{post.description}</p>
                </div> 
            </a>
        </li>
    {/each}
</ul>
        
        


<style>
    .header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title {
        margin: 28px 0 0;
        text-align: center;
    }

    .subtitle {
        max-width: 680px;
        margin: 16px 0 0;
        font-weight: 500;
        text-align: center;
        
    }

    .diff_link {
        text-decoration: underline;
    }

    .list {
        display: flex;
        flex-direction: column;
        margin: 48px auto 0;
        width: fit-content;
        padding: 0;
        list-style: none;
        list-style-image: none;
    }

    .list_element{
        border-top: 1px solid #323232;
        transition: all 0.2s;
        &:hover{
            background: #171717;
        }
        &:last-child{
            border-bottom: 1px solid #323232;
        }
    }

    .week-content {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 24px;
    }

    .week-num {
        font-size: 58px;
    }

    .vertical-line{
        width: 2px;
        min-height: 80px;
        background-color: #323232;
        margin: 0 18px;
    }

    .post-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .post-title{
        margin: 6px 0 12px;
        font-size: 18px;
        font-weight: 600;
        color: #e2e8f0
    }

    .post-description{
        color: #e1e1e1
    }
</style>
