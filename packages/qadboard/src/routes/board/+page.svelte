<script lang="ts">
    import {Button, ButtonGroup, Input, Label, Modal, Textarea} from 'flowbite-svelte';
    import {GridOutline, ListOutline, MapPinOutline, PlusOutline} from 'flowbite-svelte-icons';
    import { fade, fly, crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import Board from "./Board.svelte";
    export let data

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });
</script>

<!-- SEO -->
<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>
<section class="flex flex-wrap gap-8 container mx-auto text-center">
    <Board board={{name: 'New board', sections: []}} />
    {#each data.board as board (board.name)}
        <a href={`/board/${board.name}`}
           in:receive={{ key: board.name }} out:send={{ key: board.name }} animate:flip
        >
            <Board {board} />
        </a>

    {/each}
</section>
