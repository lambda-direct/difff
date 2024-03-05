<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        openSearchPanel,
        setSearchQuery,
        findNext,
        findPrevious,
        replaceNext,
        replaceAll,
        selectMatches
    } from "@codemirror/search";
    import { SearchQuery } from "@codemirror/search";
    import type { EditorView } from "codemirror";

    import PreciousIcon from "~/lib/icons/searchFieldIcons/PreviousIcon.svelte";
    import NextIcon from "~/lib/icons/searchFieldIcons/NextIcon.svelte";
    import AllIcon from "~/lib/icons/searchFieldIcons/AllIcon.svelte";
    import CloseIcon from "~/lib/icons/searchFieldIcons/CloseIcon.svelte";
    import DropDownIcon from "~/lib/icons/searchFieldIcons/DropDownIcon.svelte";

    import MatchCaseIcon from "~/lib/icons/searchFieldIcons/MatchCaseIcon.svelte";

    import RegularExpreIcon from "~/lib/icons/searchFieldIcons/RegularExpreIcon.svelte";

    import WholeWordIcon from "~/lib/icons/searchFieldIcons/WholeWordIcon.svelte";

    export let view: EditorView;

    export let searchValue: string = "";

    let query: any = null;
    let store;

    onMount(() => {
        if (!view) return;
        openSearchPanel(view);
        store = view.state;
    });

    onDestroy(() => {
        // Cleanup logic, if needed
    });

    let formData = {
        search: "",
        replace: "",
        caseSensitive: false,
        regexp: false,
        wholeWord: false
    };

    $: {
        const newQuery = new SearchQuery({
            search: formData.search,
            caseSensitive: formData.caseSensitive,
            regexp: formData.regexp,
            wholeWord: formData.wholeWord,
            replace: formData.replace
        });

        // view.dispatch({ effects: setSearchQuery.of(newQuery) });

        if (!query || !query.eq(newQuery)) {
            query = newQuery;
            // view.dispatch({ effects: setSearchQuery.of(newQuery) });
        }
    }

    const handleFindNext = () => {
        findNext(view);
    };

    const handleFindPrevious = () => {
        findPrevious(view);
    };

    const handleSelectMatches = () => {
        selectMatches(view);
    };

    const handleReplaceNext = () => {
        replaceNext(view);
    };

    const handleReplaceAll = () => {
        replaceAll(view);
    };
</script>

<div class="bg-rose fixed z-10 p-2">
    <form class="w-full">
        <div class="field-wrap">
            <button class="dropdown"> <DropDownIcon /> </button>
            <div class="search">
                <div class="input_wrapper">
                    <input
                        bind:value={searchValue}
                        autocomplete="off"
                        placeholder="Find"
                        id="searchInput"
                        class="input-field"
                        type="text"
                        name="search"
                    />
                    <div class="icon-wrapper">
                        <button class="main-buttons"> <MatchCaseIcon /> </button>
                        <button class="main-buttons"> <WholeWordIcon /> </button>
                        <button class="main-buttons"> <RegularExpreIcon /> </button>
                    </div>
                </div>
                <button class="main-buttons"> <PreciousIcon /> </button>
                <button class="main-buttons"> <NextIcon /> </button>
                <button class="main-buttons"> <AllIcon /> </button>
                <button class="main-buttons"> <CloseIcon /> </button>
            </div>
        </div>
        <!-- <div class="mt-8">
            <div class="m-1">
                <input
                    id="search"
                    placeholder="Finadsasdasdasdd"
                    bind:value={formData.search}
                    class="placeholder-gray-500 text-xs w-full h-8 p-1 border-1 outline-none appearance-none focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                />
            </div>
            <div class="m-1">
                <input
                    id="replace"
                    placeholder="Replace"
                    bind:value={formData.replace}
                    class="placeholder-gray-500 text-xs w-full h-8 p-1 border-1 outline-none appearance-none focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
                />
            </div>
            <div class="m-1">
                <label for="caseSensitive" class="text-xs">
                    <input
                        id="caseSensitive"
                        type="checkbox"
                        bind:checked={formData.caseSensitive}
                        class="mr-1"
                    />
                    Match case
                </label>
                <label for="regexp" class="text-xs">
                    <input
                        id="regexp"
                        type="checkbox"
                        bind:checked={formData.regexp}
                        class="mr-1"
                    />
                    Regular expression
                </label>
                <label for="wholeWord" class="text-xs">
                    <input
                        id="wholeWord"
                        type="checkbox"
                        bind:checked={formData.wholeWord}
                        class="mr-1"
                    />
                    Whole word
                </label>
            </div>
        </div>
        <div class="space-y-2 mt-2">
            <button class="mx-1" on:click={handleFindNext}>Next</button>
            <button class="mx-1" on:click={handleFindPrevious}>Previous</button>
            <button class="mx-1" on:click={handleSelectMatches}>All</button>
            <button class="mx-1" on:click={handleReplaceNext}>Replace</button>
            <button class="mx-1" on:click={handleReplaceAll}>Replace All</button>
        </div> -->
    </form>
</div>

<style>
    button {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        color: #b1b1b1;
    }
    .field-wrap {
        display: inline-flex;
        align-items: center;
        height: 36px;
        padding: 0 6px;
        border: 1px solid #2c2c2c;
        border-radius: 4px;
        background: #252526;
        color: #b1b1b1;
    }

    .input_wrapper {
        display: inline-flex;
        align-items: center;
        position: relative;
    }

    .icon-wrapper {
        position: absolute;
        right: 2px;
        display: inline-flex;
        align-items: center;
    }

    .input-field {
        height: 24px;
        background: #3c3c3c;
        outline: none;
        border: none;
        border-radius: 2px;
        font-size: 14px;
        color: #b1b1b1;
    }

    .search {
        display: flex;
        align-items: center;
    }

    .main-buttons {
        height: 24px;
        margin: 0 2px;
        padding: 0 1px;
        border-radius: 4px;
    }

    .dropdown {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
