<script lang="ts">
	import UserAuthForm from './(components)/user-auth-form.svelte';
	import logo from '$lib/assets/images/logo-1.png?enhanced';
	import School from '$lib/assets/images/school.jpg?enhanced';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';
	import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';

	const { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div
	class="container relative grid h-dvh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<!-- Form -->

	<div class="lg:p-8">
		<div class="m-auto mb-6 h-[10rem] w-[10rem]">
			<enhanced:img src={logo} alt="لوغو مدارس نخبة حلب التعليمية الخاصة" />
		</div>
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="mb-2 text-4xl font-semibold tracking-tight">تسجيل الدخول</h1>
				<p class="text-sm text-muted-foreground">
					يرجى كتابة اسم المستخدم وكلمة المرور الخاصة بالحساب.
				</p>
			</div>
			{#if form?.form?.errors?._errors?.length}
				<Alert.Root variant="destructive">
					<ExclamationTriangle class="size-4" />
					<Alert.Title>حدث خطأ</Alert.Title>
					<Alert.Description>{form?.form?.errors?._errors[0]}</Alert.Description>
				</Alert.Root>
			{/if}
			<UserAuthForm form={data} />
			<p class="px-8 text-center text-sm text-muted-foreground">
				في حال عدم وجود حساب يرجى التواصل مع
				<a href="/terms" class="font-semibold underline underline-offset-4 hover:text-primary">
					المدير التقني
				</a>
				للحصول على حساب.
			</p>
		</div>
	</div>

	<!-- Image -->
	<div class="hidden h-full flex-col rounded-md bg-muted p-10 dark:border-r lg:flex">
		<enhanced:img src={School} alt="مدرسة النخبة" class="h-full w-full rounded-md object-cover" />
	</div>
</div>

<style>
	:global(picture) {
		height: 100%;
	}
</style>
