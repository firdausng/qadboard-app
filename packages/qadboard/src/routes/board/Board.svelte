<script lang="ts">
    import type {Board} from "$lib/types";
    export let board: Board
</script>

<div class="bg-app-light dark:bg-app-dark">
    <div class="w-[200px] h-[200px] border border-app-dark dark:border-app-light rounded flex items-center justify-center">
        {board.name}
    </div>
</div>