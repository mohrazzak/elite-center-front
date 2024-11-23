<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import F7SidebarRight from '~icons/f7/sidebar-right';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from './context.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick?: (e: MouseEvent) => void;
	} = $props();

	const sidebar = useSidebar();
</script>

<Button
	type="button"
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	data-sidebar="trigger"
	variant="default"
	size="icon"
	class={cn('h-10 w-10', className)}
	{...restProps}
>
	<F7SidebarRight class="h-auto w-20" />
	<span class="sr-only">Toggle Sidebar</span>
</Button>
