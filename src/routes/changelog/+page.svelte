<script lang="ts">
    import Head from "~/lib/components/shared/Head.svelte";
    import "~/styles/index.css";

    export let data;
    const { posts } = data;
</script>

<Head
    title="Difff | Change & Decision log"
    description="Change And Decision log, Explore Latest Features, Improvements, And Fixes of JSON Online Formatter And Validator."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<header class="header">
    <h1 class="title">Difff Change & Decision Log</h1>
    <h2 class="subtitle">
        Stay in the loop with the latest features, improvements, and fixes we’ve implemented in
        <a href="/" class="diff_link"> Difff.app</a>.
    </h2>
</header>
<nav>
    <ul class="list">
        {#each posts as post}
            <li class="list_element">
                <a class="week-content" href={`changelog/${post.date}`}>
                    <p class="week-num">WEEK {post.weekNumber}</p>
                    <div class="vertical-line" />
                    <div class="post-info">
                        <p class="post-title">{post.title}</p>
                        <p class="post-description">{post.description}</p>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style lang="scss">
    .header {
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

    .list_element {
        border-top: 1px solid #323232;
        transition: all 0.2s;
        &:hover {
            background: #171717;
        }
        &:last-child {
            border-bottom: 1px solid #323232;
        }
    }

    .week-content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        @media (min-width: 768px) {
            padding: 24px;
        }
    }

    .week-num {
        text-align: center;
        font-size: 24px;
        width: 45%;
        @media (min-width: 420px) {
            font-size: 30px;
        }
        @media (min-width: 768px) {
            font-size: 68px;
            width: 40%;
        }
    }

    .vertical-line {
        width: 2px;
        min-height: 80px;
        background-color: #323232;
        margin: 0 12px 0 0;
        @media (min-width: 768px) {
            margin: 0 18px;
        }
    }

    .post-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .post-title {
        margin: 6px 0 12px;
        font-size: 14px;
        font-weight: 600;
        color: #e2e8f0;
        @media (min-width: 768px) {
            font-size: 18px;
        }
    }

    .post-description {
        color: #e1e1e1;
        font-size: 14px;
        @media (min-width: 768px) {
            font-size: 16px;
        }
    }
</style>
