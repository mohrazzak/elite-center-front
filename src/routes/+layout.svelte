<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import '../app.css';
	import { toast } from 'svelte-sonner';
	import AppSideBar from '$lib/components/app-side-bar.svelte';

	let { children } = $props();

	const flash = getFlash(page);

	$effect(() => {
		$inspect($flash);
		if ($flash) {
			const { message, type } = $flash;
			toast[type](message);
		}
	});

	$flash = undefined;

	let isProtected = $derived($page.url.pathname.startsWith('/auth'));
</script>

<Sidebar.Provider>
	{#if !isProtected}
		<AppSideBar />
	{/if}
	<Toaster richColors closeButton />
	<main>
		{#if !isProtected}
			<Sidebar.Trigger />
		{/if}
		{@render children?.()}
	</main>
</Sidebar.Provider>
