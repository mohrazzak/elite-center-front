<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form/index.js';
	import { cn } from '$lib/utils.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '../login.schema';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from '../$types';
	import GgSpinner from '~icons/gg/spinner';
	let className: string | undefined | null = $state();
	export { className as class };

	let { form }: { form: PageData } = $props();
	const dataForm = superForm(form.form, {
		validators: zodClient(loginSchema),
		delayMs: 0,
		timeoutMs: 2000,
		syncFlashMessage: true
	});
	const { form: formData, enhance, delayed, timeout } = dataForm;
</script>

<div class={cn('grid gap-6', className)}>
	<form method="POST" use:enhance>
		<div class="grid gap-2">
			<!-- Fields -->
			<div class="mb-2 grid gap-1">
				<!-- Username -->
				<Form.Field form={dataForm} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>اسم المستخدم</Form.Label>
							<Input {...props} placeholder="محمد عبدالرزاق" bind:value={$formData.username} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<!-- Password -->
				<Form.Field form={dataForm} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>كلمة المرور</Form.Label>
							<Input {...props} placeholder="********" bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<!-- Submit -->
			<Form.Button type="submit" disabled={$delayed}>
				{#if $timeout}
					يرجى الانتظار
					<GgSpinner class="animate-spin " />
				{:else}
					تسجيل الدخول
				{/if}
			</Form.Button>
		</div>
	</form>
</div>
