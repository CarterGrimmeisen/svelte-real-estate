<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SkipToContent,
		Content
	} from 'carbon-components-svelte'

	let isSideNavOpen = false
</script>

<Header expandedByDefault={false} company="Free" platformName="Real Estate" bind:isSideNavOpen>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>

	<HeaderNav>
		<HeaderNavItem href="/" text="Link 1" />
		<HeaderNavItem href="/" text="Link 2" />
		<HeaderNavItem href="/" text="Link 3" />
		<HeaderNavMenu text="Menu">
			<HeaderNavItem href="/" text="Link 1" />
			<HeaderNavItem href="/" text="Link 2" />
			<HeaderNavItem href="/" text="Link 3" />
		</HeaderNavMenu>
	</HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink text="Link 1" />
		<SideNavLink text="Link 2" />
		<SideNavLink text="Link 3" />
		<SideNavMenu text="Menu">
			<SideNavMenuItem href="/" text="Link 1" />
			<SideNavMenuItem href="/" text="Link 2" />
			<SideNavMenuItem href="/" text="Link 3" />
		</SideNavMenu>
	</SideNavItems>
</SideNav>

<Content>
	<slot />
</Content>
