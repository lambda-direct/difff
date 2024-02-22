<script lang="ts">
    export let data
    
</script>

<div class="blog-page">
    <h1 class="post-title">
        {data.title}
    </h1>
      
    <p class="post-body">
        {data.content}
    </p>
    {#if data.subTitle && data.subContent}
        <h2 class="sub-title">
            {data.subTitle}
        </h2>
        <p class="post-body">
            {data.subContent}
        </p>
    {/if}
</div>

<style>
    .post-body{
        margin: 12px 0 0;
        letter-spacing: -0.048px;
        line-height: 32px;
        color: #e1e1e1
    }

    .sub-title{
        margin: 32px 0 0;
        color: #fff
    }
    
    .post-title{
        margin: 54px 0 32px;
    }
    
    .blog-page{
        max-width: 680px;
    }
</style>