<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import MaterialSymbolsHouse from '~icons/material-symbols/house';
	import MdiUsers from '~icons/mdi/users';
	import * as DropdownMenu from './ui/dropdown-menu';
	import MingcuteUpFill from '~icons/mingcute/up-fill';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import MdiUser from '~icons/mdi/user';
	import MaterialSymbolsLogout from '~icons/material-symbols/logout';
	const sidebar = useSidebar();

	const items = [
		{
			title: 'الرئيسية',
			url: '/',
			icon: MaterialSymbolsHouse
		},
		{
			title: 'ادارة الحسابات',
			url: '/users',
			icon: MdiUsers
		}
	];

	const footerItems = [
		{ title: 'حسابي', url: '/user-profile', icon: MdiUser },
		{ title: 'تسجيل الخروج', url: '/logout', icon: MaterialSymbolsLogout }
	];
</script>

<Sidebar.Root side="right" collapsible="icon">
	<Sidebar.Header>
		<div class="flex items-center justify-center">
			<enhanced:img src="$lib/assets/images/logo-1.png" class="h-auto w-32" />
		</div>
		<Sidebar.Separator class="my-2" />
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu state={sidebar.state}>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton size="lg">
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span class="group-data-[state=collapsed]:hidden">{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								size="lg"
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								د. فادي أبودان
								<MingcuteUpFill
									class="mr-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
								/>
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
						{#each footerItems as item}
							<DropdownMenu.Item>
								<a href="/logout">{item.title}</a>
								<item.icon />
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
