<script lang="ts">
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import FormatIcon from "~/lib/icons/FormatIcon.svelte";
    import BtnIcon from "~/lib/shared/ButtonWithIcon.svelte";
    import DownLoadIcon from "~/lib/icons/DownloadIcon.svelte";

    export let formatClick = () => {};
    export let downloadClick = () => {};
    export let copyClick = () => {};
</script>

<div class="icon-header">
    <BtnIcon aria-label="format" aria-labelledby="format" name="format" click={formatClick}
        ><div class="title-wrapper">
            <FormatIcon /><span class="icon-txt">format</span>
        </div>
    </BtnIcon>
    <div class="icon-btn-wrapp">
        <BtnIcon
            aria-label="download"
            aria-labelledby="download"
            name="download"
            click={downloadClick}><DownLoadIcon color={"#7d8799"} /></BtnIcon
        >
        <BtnIcon aria-label="copy" aria-labelledby="copy" name="copy" click={copyClick}
            ><CopyIcon color={"#7d8799"} /></BtnIcon
        >
    </div>
</div>

<style>
    .icon-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        height: 54px;
        background: #030711;
        border-bottom: 1px solid #2c2c2c;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .title-wrapper {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #7d8799;
    }
    .icon-txt {
        font-size: 14px;
    }
    .icon-btn-wrapp {
        display: flex;
        gap: 8px;
    }
</style>
