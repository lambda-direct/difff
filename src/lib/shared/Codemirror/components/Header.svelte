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
    import { isSearchOpen, isSettingsOpen } from "~/storage/store";
    import { dropDownOptions } from "~/lib/shared/Codemirror/components/utils";
    import type { Formats, Tools, UploadEvent } from "~/types";
    import MinifyIcon from "~/lib/icons/MinifyIcon.svelte";

    export let tool: Tools;
    export let formats: Formats[];
    export let handleFileChange: (event: UploadEvent) => void;
    export let handleMainClick: () => void;
    export let closeSearch: () => void;

    let showDropDown: boolean = false;
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
        if ($isSearchOpen) {
            closeSearch();
        } else {
            $isSearchOpen = true;
            $isSettingsOpen = false;
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const { metaKey, ctrlKey, key } = event;
        if ((metaKey || ctrlKey) && key === "f") {
            event.preventDefault();
            handleSearchMenuClick();
        }
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
        closeSearch();
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
                    <div class="dropdown_content_options">
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
            title="Navigation"
            aria-labelledby="Navigation dropdown"
            aria-label="Navigation dropdown"
            class="button text"
        >
            {#if tool === "formatter"}
                <span class="btn_title">{`${formats[0].toUpperCase()} Formatter`}</span>
            {:else if tool === "converter"}
                <span class="btn_title">
                    {`${formats[0].toUpperCase()}/${formats[1].toUpperCase()} Converter`}
                </span>
            {:else if tool === "minifier"}
                <span class="btn_title">
                    {`${formats[0].toUpperCase()} Minifier`}
                </span>
            {/if}
            {#if showDropDown}
                <DropDownOpenIcon />
            {:else}
                <DropDownIcon />
            {/if}
        </button>
    </nav>
    <!-- <button
        on:click|stopPropagation={() => {
            goto(`/converter/${formats[1]}-to-${formats[0]}`);
        }}
        aria-labelledby="SwitchLanguages"
        aria-label="SwitchLanguages"
        class="button"
    >
        <ChangeConvertors />
    </button> -->
    <button
        on:click={handleMainClick}
        class="button text main-button"
        title={tool + " click"}
        aria-label={tool + "click"}
        aria-labelledby={tool + "click"}
        name={tool + "click"}
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
        {:else if tool === "minifier"}
            <span class="header_btn">
                <MinifyIcon />
                Minify
            </span>
        {/if}
    </button>
    <div class="button-wrapper">
        <button
            class="button"
            title="Search"
            aria-label="search"
            aria-labelledby="search"
            name="search"
            on:click={handleSearchMenuClick}
        >
            <SearchIcon />
        </button>
        <button
            class="button"
            title="Upload"
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
            title="Settings"
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        z-index: 6;
        display: flex;
        flex-direction: row;
        position: absolute;
        text-align: center;
        top: 42px;
        width: fit-content;
        padding: 10px 8px;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 6px;
        box-shadow: 0px 8px 16px #000;
        user-select: none;
        @media (max-width: 420px) {
            flex-direction: column;
            padding: 12px;
        }
    }
    .dropdown_content_options {
        width: 100%;
        padding: 0px 2px;
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

    .main-button {
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
