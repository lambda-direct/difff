<script>
    import "~/styles/index.css";
</script>

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
            </a>.
        </h2>
        <div class="change-log-posts">
            <div class="week-content">
                <div class="main-content">
                    <p class="week-num">WEEK 1</p>
                    <div class="info-container">
                        <div class="mini-title">
                            <p>Induction</p>
                            <p>How to start your first product?</p>
                        </div>
                    </div>
                </div>
                <span class="date">Feb 22, 2024</span>
            </div>
            <div class="week-content">
                <div class="main-content">
                    <p class="week-num">WEEK 2</p>
                    <div class="info-container">
                        <div class="mini-title">
                            <p>Our first ideas to how we can do it</p>
                            <p>The question was, how to make everything work as we want?</p>
                        </div>
                    </div>
                </div>
                <span class="date">Feb 22, 2024</span>
            </div>
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
        color: #e2e8f0;
        text-align: center;
    }
    .date {
        font-size: 14px;
        font-family: "NotoSans-Regular", sans-serif;
        font-weight: 700;
        color: #e1e1e1;
    }
    .subtitle {
        margin: 16px 0 0;
        text-align: center;
    }
    .mini-title {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
    }
    .info-container {
        display: flex;
        margin: 0 0 0 18px;
    }
    .week-num {
        padding: 0 4px 0 0;
        border-right: 2px solid #323232;
        font-size: 72px;
    }
    .week-content {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        width: 100%;
        border-top: 1px solid #323232;
    }
    .week-content:last-child {
        border-bottom: 1px solid #323232;
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
</style>
