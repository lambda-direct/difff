<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import SearchIcon from "~/lib/icons/SearchIcon.svelte";
    import UploadIcon from "~/lib/icons/UploadIcon.svelte";
    import MagicWand from "~/lib/icons/MagicWandIcon.svelte";
    import SettingsIcon from "~/lib/icons/SettingsIcon.svelte";
    import DropDownIcon from "~/lib/icons/DropDownIcon.svelte";
    import DropDownOpenIcon from "~/lib/icons/DropDownOpenIcon.svelte";
    import ConvertIcon from "~/lib/icons/ConvertIcon.svelte";
    import { isSettingsOpen } from "~/storage/store";
    import { dropDownOptions } from "~/lib/shared/Codemirror/components/utils";
    import type { UploadEvent } from "~/types";

    export let tool: "formatter" | "converter";
    export let formats: ("json" | "yaml" | "xml")[];
    export let handleFileChange: (event: UploadEvent) => void;
    export let handleClick: () => void;
    export let open: () => void;
    export let close: () => void;

    let showDropDown: boolean = false;
    let searchMenuOpened: boolean = false;
    let fileInput: HTMLInputElement;

    const handleDropDownClick = () => {
        showDropDown = !showDropDown;
        if (browser) document.body.addEventListener("click", handleMenuClose);
    };

    const handleMenuClose = () => {
        showDropDown = false;
        if (browser) document.body.removeEventListener("click", handleMenuClose);
    };

    const handleSearchMenuClick = () => {
        const newValue = !searchMenuOpened;
        searchMenuOpened = newValue;
        if (newValue) {
            open();
        } else {
            close();
        }
        const closeBtn = document.querySelector("[name=close]");
        if (!closeBtn) return;
        closeBtn.addEventListener("click", () => {
            handleSearchMenuClick();
            closeBtn.removeEventListener("click", handleSearchMenuClick);
        });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const { metaKey, ctrlKey, key } = event;
        if (!(metaKey || ctrlKey) || key !== "f") return;
        handleSearchMenuClick();
    };

    const handleEnterClick = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Enter") {
            handleDropDownClick();
        }
    };

    const handleFileUpload = () => {
        if (fileInput) {
            fileInput.click();
        }
    };

    const openSettings = () => {
        $isSettingsOpen = !$isSettingsOpen;
        if ($isSettingsOpen) {
            searchMenuOpened = false;
            close();
        }
    };

    onMount(() => {
        if (browser) document.addEventListener("keydown", handleKeyDown);
    });

    onDestroy(() => {
        if (browser) document.removeEventListener("keydown", handleKeyDown);
    });
</script>

<div class="header">
    <nav class="drop-down-wrapper">
        <div class="dropdown" class:active={showDropDown} class:hidden={!showDropDown}>
            <div
                role="button"
                tabindex="0"
                aria-labelledby="Dropdown"
                aria-label="Dropdown"
                on:click|stopPropagation
                on:keydown={handleEnterClick}
                class="dropdown_content"
            >
                {#each dropDownOptions as options}
                    <div>
                        <p class="content_label">
                            {options.title}
                        </p>
                        <ul>
                            {#each options.values as option}
                                <li class="dropdown_options">
                                    <a href={option.path} class="option_link">
                                        {option.name}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
        <button
            on:click|stopPropagation={handleDropDownClick}
            aria-labelledby="Formats dropdown"
            aria-label="Formats dropdown"
            class="button text"
        >
            {#if tool === "formatter"}
                <span class="btn_title">{`${formats[0].toUpperCase()} Formatter`}</span>
            {:else if tool === "converter"}
                <span class="btn_title">
                    {`${formats[0].toUpperCase()}-${formats[1].toUpperCase()} Converter`}
                </span>
            {/if}
            {#if showDropDown}
                <DropDownOpenIcon />
            {:else}
                <DropDownIcon />
            {/if}
        </button>
    </nav>
    <button
        on:click={handleClick}
        class="button text format-button"
        aria-label="format"
        aria-labelledby="format"
        name="format"
    >
        {#if tool === "formatter"}
            <span class="header_btn">
                <MagicWand />
                Format
            </span>
        {:else if tool === "converter"}
            <span class="header_btn">
                <ConvertIcon />
                Convert
            </span>
        {/if}
    </button>
    <div class="button-wrapper">
        <button
            class="button"
            title="search"
            aria-label="search"
            aria-labelledby="search"
            name="search"
            on:click={handleSearchMenuClick}
        >
            <SearchIcon />
        </button>
        <button
            class="button"
            title="upload"
            aria-label="upload"
            aria-labelledby="upload"
            name="upload"
            on:click={handleFileUpload}
        >
            <input
                type="file"
                class="file-input"
                bind:this={fileInput}
                on:change|preventDefault={handleFileChange}
            />
            <UploadIcon />
        </button>
        <button
            class="button"
            title="settings"
            aria-label="settings"
            aria-labelledby="settings"
            name="settings"
            on:click={openSettings}
        >
            <SettingsIcon />
        </button>
    </div>
</div>

<style lang="scss">
    .dropdown_options {
        border-radius: 4px;
        background: transparent;
        font-size: 16px;
        color: #7d8799;
    }

    .dropdown_options:hover {
        z-index: 5;
        overflow: visible;
        white-space: normal;
        cursor: pointer;
        background: #f5f5f014;
        color: #e1e1e1;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .option_link {
        padding: 4px;
        display: block;
        width: 100%;
    }

    .active {
        opacity: 1;
    }

    .hidden {
        opacity: 0;
    }

    .file-input {
        display: none;
    }

    .dropdown_content {
        z-index: 4;
        display: flex;
        flex-direction: column;
        position: absolute;
        text-align: center;
        top: 42px;
        width: 100%;
        padding: 8px;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 6px;
        box-shadow: 0px 8px 16px #000;
        user-select: none;
        @media (max-width: 420px) {
            width: fit-content;
        }
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        height: 54px;
        background: #030711;
        border-bottom: 1px solid #313345;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .drop-down-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .content_label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        border-radius: 8px;
        color: #7d8799;
        font-size: 16px;
        font-weight: 600;
        cursor: default;
    }

    .header_btn {
        display: flex;
        gap: 4px;
        font-size: 16px;
        align-items: center;
    }

    .button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 6px;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 8px;
        transition: all 0.2s;
        color: #7d8799;
        &:hover {
            background: #040f1e;
            color: #e1e1e1;
        }
    }

    .text {
        padding: 0 12px;
    }

    .format-button {
        margin: auto;
    }

    .btn_title {
        @media (max-width: 420px) {
            display: none;
        }
    }

    .button-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        width: 15%;
        @media (min-width: 420px) {
            gap: 6px;
            width: 20%;
        }
    }
</style>
