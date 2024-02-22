<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>{data.metadata.metaTitle}</title>
    <meta name="description" content={data.metadata.metaDescription} />
</svelte:head>

<div class="blog-page">
    <svelte:component this={data.content} />
</div>

<style>
    .blog-page {
        font-family: Georgia, Cambria, "Times New Roman", Times, serif;
        max-width: 680px;
        & h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
            padding: 0;
            color: #ffffff;
        }

        & menu,
        ol,
        ul {
            padding: 0;
            margin: 0;
            list-style: disc;
            list-style-image: none;
        }

        & ul {
            & ul {
                list-style: circle;
            }
        }

        & li {
            margin: 22px 0 0 30px;
            font-size: 20px;

            color: #e1e1e1;
            &:first-child {
                margin: 42px 0 0 30px;
            }
            & li {
                &:first-child {
                    margin: 22px 0 0 30px;
                }
            }
        }

        & h1 {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            margin: 50px 0 32px 0;
            font-size: 42px;
            line-height: 52px;
            color: #ffffff;
            @media (max-width: 768px) {
                margin: 32px 0 24px 0;
                line-height: 48px;
                font-size: 32px;
            }
        }

        & h2 {
            margin: 34px 0 0;
            color: #fff;
        }

        & h3 {
            margin: 24px 0 0;
            color: #fff;
        }

        & em {
            font-size: 18px;
        }

        & a {
            text-decoration: underline;
        }

        & img {
            max-width: 100%;
        }

        & p {
            margin: 42px 0 0;
            padding: 0;
            letter-spacing: -0.048px;
            clear: left;
            line-height: 32px;
            font-size: 20px;
            color: #e1e1e1;
            @media (max-width: 768px) {
                margin: 24px 0 0;
                line-height: 28px;
                font-size: 18px;
            }
        }
        & blockquote {
            margin: 0 0 0 -20px;
            padding: 0 0 0 23px;
            box-shadow: inset 3px 0 0 0 #e1e1e1;
            & p {
                & strong {
                    font-style: italic;
                    font-family: "source-serif-4";
                }
            }
        }
        & figure {
            margin: 56px 0 0;
            padding: 0;
            & figcaption {
                font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
                margin: 10px 0 0;
                padding: 0;
                text-align: center;
                color: #cacacad4;
            }
        }
    }
</style>
