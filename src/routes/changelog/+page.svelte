<script lang="ts">
    import "~/styles/index.css";

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

<div class="page-wrapper">
    <div class="container">
        <h1 class="title">Difff Change & Decision log</h1>
        <h2 class="subtitle">
            Stay in the loop with the latest features, improvements, and fixes we’ve implemented in
            <a
                href="https://difff.app/"
                rel="nofollow noopener noreferrer"
                target="_blank"
                class="difff-href">
                Difff.app
            </a>
        </h2>
        <div class="change-log-posts">
            {#each posts as post}
            <a href={`changelog/week/${post.id}`}>
                <div class="week-content">
                    <div class="main-content">
                        <p class="week-num">{post.slug.replace('-', " ")}</p>
                        <div class="post-info">
                            <p class="post-title">{post.title}</p>
                            <p class="post-description">{post.description}</p>
                        </div>
                    </div>
                    <span class="date">{post.data}</span>
                </div>
            </a>
                
            {/each}
        </div>
    </div>
</div>

<style>
    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 16px;
    }
    .main-content {
        display: flex;
        padding: 16px;
    }
    .title {
        margin: 28px 0 0;
        text-align: center;
    }
    .date {
        min-width: 90px;
        font-size: 14px;
        font-family: "NotoSans-Regular", sans-serif;
        font-weight: 700;
        color: #e1e1e1;
    }
    .subtitle {
        margin: 16px 0 0;
        font-weight: 500;
        text-align: center;
        
    }
    .post-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0 0 0 12px;
    }
    .week-num {
        min-width: 320px;
        border-right: 2px solid #323232;
        text-transform: uppercase;
        font-size: 72px;
    
    }
    .week-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding: 8px;
        border-top: 1px solid #323232;
    }
    .week-content:last-child {
        border-bottom: 1px solid #323232;
    }
    .week-content:hover{
        background: #0e0e0e;
    }
    .change-log-posts {
        display: flex;
        flex-direction: column;
        margin: 48px auto 0;
        width: fit-content;
    }
    .difff-href {
        text-decoration: underline;
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
