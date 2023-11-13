<script lang="ts">
    import {Button, ButtonGroup, Input, Label, Modal, Textarea} from 'flowbite-svelte';
    import {GridOutline, ListOutline, MapPinOutline, PlusOutline} from 'flowbite-svelte-icons';
    import Markdown from '@magidoc/plugin-svelte-marked'
    // import type {Card} from "./card";
    import { fade, fly, crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import type {Card} from "$lib/types";
    export let data

    let formModal = false;
    let newNoteModal = false;
    const defaultCard = {
        content: '',
        reactions: {
            like: 0
        },
        writer: 'Firdaus',
        id: '0'
    }
    $: activeCard = JSON.parse(JSON.stringify({...defaultCard}));
    let activeSection = '';
    let activeIndex = 0;
    let textareaprops = {
        id: 'message',
        name: 'message',
        label: 'Your message',
        rows: 10,
        placeholder: 'Leave a comment...'
    };
    let hoveringOverSection: string| null;

    let proseClass = "prose prose-sm dark:prose-invert prose-stone prose-p:text-xs prose-p:tracking-wide prose-p:mt-0 prose-p:mb-0.5 prose-ul:mb-0 prose-ul:mt-0 prose-ol:mt-0 prose-ol:mb-0 prose-li:mt-0 prose-li:mb-0 prose-li:marker:text-app-dark/70 prose-li:dark:marker:text-app-light/70"

    let orientationList = data.board.sections.map(s => ({
        name: s.name,
        orientation: 'grid'
    }))


    function changeOrientation(orientation: string, section: string) {
        orientationList.filter(s => s.name === section)[0].orientation = orientation;
        orientationList = orientationList;
    }

    function addNewNote(section: string) {
        activeSection = section;
        activeCard = JSON.parse(JSON.stringify({...defaultCard}));
        data = {...data};
        newNoteModal = true;
    }

    function openTextModal(card: Card, section: string, index: number) {
        activeCard = {...card};
        activeSection = section;
        activeIndex = index;
        data = {...data};
        formModal = true
    }

    function handleCreateNewItem() {
        const existingCardList = data.board.sections.filter(s => s.name === activeSection)[0].card;
        // this is for simple deep clone, this is required for svelte to make sure no activeCard object object value is not shared
        const newCard = JSON.parse(JSON.stringify({...activeCard, id: `${existingCardList.length + 1}`}));
        data.board.sections.filter(s => s.name === activeSection)[0].card =
            data.board.sections.filter(s => s.name === activeSection)[0].card.concat(newCard);
        data = {...data};
        activeCard = JSON.parse(JSON.stringify({...activeCard}));

        newNoteModal = false; // close the modal
    }

    function handleDeleteItem(card: Card, section: string, index: number) {
        let sectionIndex = data.board.sections.findIndex(s => s.name === section);
        if(sectionIndex !== -1){
            data.board.sections[sectionIndex].card.splice(index, 1)
            data = {...data};
        }
    }

    function handleAccept() {
        data.board.sections.filter(s => s.name === activeSection)[0].card[activeIndex].content = activeCard.content;
        data = {...data};
        formModal = false; // close the modal
    }

    function handleCancel() {
        activeCard = JSON.parse(JSON.stringify({...defaultCard}));
        formModal = false; // close the modal
    }

    function handleLike(card: Card, section: string) {
        let sectionIndex = data.board.sections.findIndex(s => s.name === section);
        if(sectionIndex !== -1){
            const cardIndex = data.board.sections[sectionIndex].card.findIndex(c => c.id === card.id);
            if(cardIndex !== -1){
                data.board.sections[sectionIndex].card[cardIndex].reactions.like += 1;
            }
        }
    }

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 200,
                easing: quintOut,
                css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });

    function dragStart(event: any, sectionIndex: number, cardIndex: number) {
        // The data we want to make available when the element is dropped
        // is the index of the item being dragged and
        // the index of the basket from which it is leaving.
        console.log('dragStart')
        const data = {sectionIndex, cardIndex};
        event.dataTransfer.setData('text/plain', JSON.stringify(data));
    }

    function drop(event:any, sectionIndex:number) {
        console.log('drop')
        event.preventDefault();
        const json = event.dataTransfer.getData("text/plain");
        const moveData = JSON.parse(json);

        // Remove the item from one basket.
        // Splice returns an array of the deleted elements, just one in this case.
        const [item] = data.board.sections[moveData.sectionIndex].card.splice(moveData.cardIndex, 1);

        // Add the item to the drop target basket.
        data.board.sections[sectionIndex].card.push(item);
        data = {...data};

        hoveringOverSection = null;
    }

</script>

<!-- SEO -->
<svelte:head>
    <title>{'board - ' + data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={'board - ' + data.meta.title} />
</svelte:head>
{#if data.board}
    <section class="p-1">
        <h1 class="text-center text-2xl">{data.board.name}</h1>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-{data.board.sections.length} py-2 px-8 gap-2">
        {#each data.board.sections as section, sectionIndex (section.name)}
            <div
                    role="button" tabindex="0" aria-label="Section"
                    class:hovering={hoveringOverSection === section.name}
                    on:dragenter={() => {hoveringOverSection = section.name}}
                    on:dragleave={() => {hoveringOverSection = null}}
                    on:drop={event => {console.log('drop'); drop(event, sectionIndex)}}
                    on:dragover={()=> {console.log('dragover'); return false;}}
                    class="p-2 border border-app-lightest dark:border-app-darkest bg-white dark:bg-black/20 rounded shadow-inner ring-1 ring-black/5 shadow-app-darkest/20 dark:shadow-app-lightest/20">
                <div class="p-2 flex gap-4 justify-between">
                    <p class="text-center">{section.name}</p>
                    <ButtonGroup>
                        <Button outline color="primary" on:click={()=> changeOrientation('grid', section.name)}>
                            <GridOutline class="w-3 h-3 mr-2" />
                        </Button>
                        <Button outline color="primary" on:click={()=> changeOrientation('list', section.name)}>
                            <ListOutline class="w-3 h-3 mr-2" />
                        </Button>
                        <Button outline color="primary" on:click={()=> addNewNote(section.name)}>
                            <PlusOutline class="w-3 h-3 mr-2" />
                        </Button>
                    </ButtonGroup>
                </div>
                <div class="grid grid-cols-1 {orientationList.find(o => o.name === section.name)?.orientation === 'list'? '': 'md:grid-cols-3'} gap-2 ">
                    {#each section.card as card, cardIndex (card.id)}
                        <div
                                role="button" tabindex="0" aria-label="card"
                                draggable={true}
                                on:dragstart={event => dragStart(event, sectionIndex, cardIndex)}
                                animate:flip={{ duration: 250, easing: quintOut }}
                                in:fly={{ y: 200 }} out:fade={{duration: 200}}
                                class="p-2 flex flex-col gap-2 justify-between bg-{section.color}-200 dark:bg-{section.color}-900 border border-app-light dark:border-app-dark shadow-sm shadow-app-darkest/20 dark:shadow-app-lightest/20 cursor-pointer">
                            <div class="grow flex flex-col">
                                <div class="flex justify-between">
                                    {#if card.writer.length > 0}
                                        <p class="font-semibold text-md">{card.writer}</p>
                                    {:else}
                                        <p class="font-semibold text-md opacity-70">anonymous</p>
                                    {/if}
                                    <MapPinOutline class="w-3 h-3 mr-2" />
                                </div>
                                <div class={proseClass + ' grow'}>
                                    <Markdown source={card.content}/>
                                </div>
                            </div>
                            <div class="flex gap-4 justify-between items-center">
                                <div class="flex items-center">
                                    <button class="flex" on:click={() => handleLike(card, section.name)}>
                                        <svg class="w-[15px] h-[15px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"/>
                                        </svg>
                                        <span class="text-sm font-semibold text-app-darkest dark:text-app-lightest">+{ card.reactions.like}</span>
                                    </button>
                                </div>
                                <div>
                                    <button class="px-2 pb-1 bg-app-dark dark:bg-app-light text-app-light dark:text-app-dark rounded text-center text-sm" on:click={() => openTextModal(card, section.name, cardIndex)}>
                                        Edit
                                    </button>
                                    <button class="px-2 pb-1 bg-app-dark dark:bg-app-light text-app-light dark:text-app-dark rounded text-center text-sm" on:click={() => handleDeleteItem(card, section.name, cardIndex)}>
                                        Remove
                                    </button>
                                </div>
                            </div>

                        </div>

                    {/each}
                </div>

            </div>
        {/each}
        <Modal bind:open={formModal} size="xl" autoclose outsideclose class="w-full">
            <div class={proseClass}>
                <Markdown source={activeCard.content}/>
            </div>
            <Textarea {...textareaprops} bind:value={activeCard.content} />
            <svelte:fragment slot="footer">
                <Button on:click={handleAccept}>Save</Button>
                <Button on:click={handleCancel} color="alternative">Cancel</Button>
            </svelte:fragment>
        </Modal>

        <Modal bind:open={newNoteModal} size="xl" autoclose outsideclose class="w-full">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add New Note</h3>
            <Label class="space-y-2">
                <span>User</span>
                <Input type="text" name="user" placeholder="Your Name" required bind:value={activeCard.writer} />
            </Label>
            <div class={proseClass}>
                <Markdown source={activeCard.content}/>
            </div>
            <Label class="space-y-2">
                <span>Note</span>
                <Textarea {...textareaprops} bind:value={activeCard.content} />
            </Label>
            <svelte:fragment slot="footer">
                <Button on:click={handleCreateNewItem}>Save</Button>
                <Button on:click={handleCancel} color="alternative">Cancel</Button>
            </svelte:fragment>
        </Modal>
    </section>
{/if}
