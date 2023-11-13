<script>
	import { page } from '$app/stores';

	import { DarkMode } from 'flowbite-svelte';

	// import logo from '$lib/images/svelte-logo.svg';
	// import github from '$lib/images/github.svg';
	// import Toggle from './toggle.svelte'
</script>

<header class="p-2">
	<div class="corner">
		<a href="https://kit.svelte.dev">
<!--			<img src={logo} alt="SvelteKit" />-->
		</a>
	</div>

	<nav>
		<ul class="flex gap-2 justify-center items-center">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname === '/board' ? 'page' : undefined}>
				<a href="/board">Board</a>
			</li>
			<li>
				<DarkMode />
			</li>
		</ul>
	</nav>

	<div class="corner">

		<a href="https://github.com/sveltejs/kit">
<!--			<img src={github} alt="GitHub" />-->
		</a>
	</div>
</header>