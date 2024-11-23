<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		state,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
		state?: string;
	} = $props();
</script>

<ul
	bind:this={ref}
	data-sidebar="menu"
	class={cn('flex w-full min-w-0 flex-col gap-2', className, state === 'collapsed' && 'gap-8')}
	{...restProps}
>
	{@render children?.()}
</ul>
