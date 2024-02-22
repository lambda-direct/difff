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
        <h1 class="title">Change & Decision log</h1>
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
            <a href={`changelog/${post.id}`}>
                <div class="week-content">
                    <div class="main-content">
                        <p class="week-num">{post.data}</p>
                        <div class="post-info">
                            <p class="post-title">{post.title}</p>
                            <p class="post-description">{post.description}</p>
                        </div>
                    </div>
                    <!-- <span class="date">{post.data.split(',')[1]}</span> -->
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
    .subtitle {
        max-width: 680px;
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
        min-width: 240px;
        padding: 0 12px 0 0;
        border-right: 2px solid #323232;
        font-size: 64px;
    
    }
    .week-content {
        display: flex;
        align-items: flex-start;
        justify-content: center;
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
