<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import PageTransition from './transition.svelte'

	export let data: {url:string}
</script>

<div class="mx-auto">
	<Header />

	<main>
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</main>

<!--	<footer>-->
<!--		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>-->
<!--	</footer>-->
</div>
