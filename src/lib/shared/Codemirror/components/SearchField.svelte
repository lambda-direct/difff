<script lang="ts">
    import type { SearchData } from "~/types";
    import AllIcon from "~/lib/icons/searchFieldIcons/AllIcon.svelte";
    import NextIcon from "~/lib/icons/searchFieldIcons/NextIcon.svelte";
    import CloseIcon from "~/lib/icons/searchFieldIcons/CloseIcon.svelte";
    import ReplaceIcon from "~/lib/icons/searchFieldIcons/ReplaceIcon.svelte";
    import PreciousIcon from "~/lib/icons/searchFieldIcons/PreviousIcon.svelte";
    import DropDownIcon from "~/lib/icons/searchFieldIcons/DropDownIcon.svelte";
    import WholeWordIcon from "~/lib/icons/searchFieldIcons/WholeWordIcon.svelte";
    import MatchCaseIcon from "~/lib/icons/searchFieldIcons/MatchCaseIcon.svelte";
    import ReplaceAllIcon from "~/lib/icons/searchFieldIcons/ReplaceAllIcon.svelte";
    import DropDownIconOpen from "~/lib/icons/searchFieldIcons/OpenDropDOwnIcon.svelte";
    import RegularExpreIcon from "~/lib/icons/searchFieldIcons/RegularExpreIcon.svelte";

    export let performSearch: (searchData: SearchData) => void;
    export let nextSearchValue: () => void;
    export let previousSearchValue: () => void;
    export let selectAllMatches: () => void;
    export let replaceNext: () => void;
    export let replaceAll: () => void;
    export let closeSearch: () => void;

    let search: string = "";
    let replace: string = "";
    let caseSensitive = false;
    let wholeWord = false;
    let regexp = false;

    let showDropDown: boolean = false;

    const dropDownClick = () => {
        showDropDown = !showDropDown;
    };

    $: {
        const searchData = {
            search,
            replace,
            caseSensitive,
            regexp,
            wholeWord
        };
        if (performSearch) performSearch(searchData);
    }
</script>

<div class="field-wrap" class:open={showDropDown} class:closed={!showDropDown}>
    <button on:click={dropDownClick} class="dropdown">
        {#if showDropDown}
            <DropDownIconOpen />
        {:else}
            <DropDownIcon />
        {/if}
    </button>
    <div class="search">
        <div class="search_row">
            <div class="input_wrapper">
                <input
                    bind:value={search}
                    autocomplete="off"
                    id="searchInput"
                    placeholder="Find"
                    class="input-field"
                    type="text"
                    name="search"
                />
                <div class="icon-wrapper">
                    <button
                        on:click={() => (caseSensitive = !caseSensitive)}
                        aria-labelledby="Match case"
                        aria-label="Match case"
                        class="icon_buttons secondary"
                        class:checked={caseSensitive}
                        ><input type="checkbox" bind:checked={caseSensitive} /><MatchCaseIcon />
                    </button>
                    <button
                        on:click={() => (wholeWord = !wholeWord)}
                        aria-labelledby="Match whole word"
                        aria-label="Match whole word"
                        class="icon_buttons secondary"
                        class:checked={wholeWord}
                    >
                        <input type="checkbox" bind:checked={wholeWord} />
                        <WholeWordIcon />
                    </button>
                    <button
                        on:click={() => (regexp = !regexp)}
                        aria-labelledby="Use Regular Expression"
                        aria-label="Use Regular Expression"
                        class="icon_buttons secondary"
                        class:checked={regexp}
                    >
                        <input type="checkbox" bind:checked={regexp} />
                        <RegularExpreIcon />
                    </button>
                </div>
            </div>
            <button
                on:click={previousSearchValue}
                aria-labelledby="Previous Match"
                aria-label="Previous Match"
                class="icon_buttons main"
            >
                <PreciousIcon />
            </button>
            <button
                on:click={nextSearchValue}
                aria-labelledby="Next Match"
                aria-label="Next Match"
                class="icon_buttons main"
            >
                <NextIcon />
            </button>
            <button
                on:click={selectAllMatches}
                aria-labelledby="Select All Matches"
                aria-label="Select All Matches"
                class="icon_buttons main"
            >
                <AllIcon />
            </button>
            <button
                on:click={closeSearch}
                aria-labelledby="Close"
                aria-label="Close"
                class="icon_buttons main"
            >
                <CloseIcon />
            </button>
        </div>
        {#if showDropDown}
            <div class="search_row">
                <div class="input_wrapper">
                    <input
                        bind:value={replace}
                        autocomplete="off"
                        placeholder="Replace"
                        id="replaceInput"
                        class="input-field"
                        type="text"
                        name="replace"
                    />
                </div>
                <button
                    on:click={replaceNext}
                    aria-labelledby="Replace Next"
                    aria-label="Replace Next"
                    disabled={replace.length < 1}
                    class="icon_buttons main"
                >
                    <ReplaceIcon />
                </button>
                <button
                    on:click={replaceAll}
                    aria-labelledby="Replace All"
                    aria-label="Replace All"
                    disabled={replace.length < 1}
                    class="icon_buttons main"
                >
                    <ReplaceAllIcon />
                </button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    button {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        color: #b1b1b1;
        &:hover:enabled {
            background: #535353;
        }
        &:disabled {
            cursor: default;
        }
        input[type="checkbox"] {
            display: none;
        }
    }

    .field-wrap {
        position: absolute;
        top: 6px;
        right: 24px;
        z-index: 5;
        display: flex;
        align-items: center;
        padding: 0 6px 0 4px;
        border: 1px solid #2c2c2c;
        border-radius: 4px;
        background: #252526;
        color: #b1b1b1;
        animation: floatIn 0.2s ease-in-out 0s forwards;
    }

    @keyframes floatIn {
        to {
            top: 12px;
        }
    }

    .input_wrapper {
        display: inline-flex;
        align-items: center;
        position: relative;
    }

    .open {
        height: 76px;
    }

    .closed {
        height: 36px;
    }

    .icon-wrapper {
        position: absolute;
        right: 2px;
        display: inline-flex;
        align-items: center;
    }

    .input-field {
        height: 26px;
        padding: 0 76px 0 4px;
        background: #3c3c3c;
        outline: none;
        border: 1px solid transparent;
        border-radius: 2px;
        font-size: 14px;
        color: #b1b1b1;
        &:focus {
            border: 1px solid #007fd4;
        }
    }

    .search {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .search_row {
        display: inline-flex;
    }

    .icon_buttons {
        margin: 0 2px;
        padding: 0 1px;
        border-radius: 4px;
    }

    .main {
        height: 24px;
    }

    .secondary {
        height: 22px;
        border: 1px solid transparent;
    }

    .checked {
        background: #007fd48a !important;
        border: 1px solid #007fd4 !important;
    }

    .dropdown {
        height: 100%;
        margin: 0 1px 0 0;
        padding: 0;
        &:hover {
            background: #3d3d3f;
        }
    }
</style>
