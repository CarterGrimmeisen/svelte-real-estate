<script context="module" lang="ts">
	import Images from '$lib/Listing/Images.svelte'
	import Room from '$lib/Listing/Room.svelte'
	import { createDefaultListing } from '$lib/util'
	import type { Listing } from '@prisma/client'
	import type { Load } from '@sveltejs/kit'
	import {
		Grid,
		Button,
		Column,
		DataTable,
		Form,
		FormGroup,
		Modal,
		NumberInput,
		Row,
		TextArea,
		TextInput,
		Tile,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte'
	import { Add16 } from 'carbon-icons-svelte'
	import { Robot } from 'carbon-pictograms-svelte'

	export const load: Load = async ({ fetch }) => {
		const res = await fetch(`./listings.json`)

		if (res.ok) {
			return { props: { listings: await res.json() } }
		}

		return {
			status: res.status,
			error: new Error(`Could not fetch listings ${res.body}`)
		}
	}
</script>

<script lang="ts">
	export let listings: Listing[]

	let createListing = false

	const _priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
	const formatPrice = (price: number) => _priceFormatter.format(price)

	const _sqftFormatter = new Intl.NumberFormat('en-US')
	const formatSqft = (sqft: number) => _sqftFormatter.format(sqft)

	const headers = [
		{ key: 'mlsn', value: 'MLSN', sort: false as const },
		{ key: 'address', value: 'Address' },
		{ key: 'price', value: 'Price', display: (price: number) => formatPrice(price) },
		{ key: 'sqft', value: 'SQ Footage', display: (sqft: number) => `${formatSqft(sqft)} sqft.` },
		{ key: 'agentEmail', value: 'Agent Email' }
	]

	$: rows = listings.map((each) => ({
		...each,
		id: each.mlsn,
		address: `${each.street}, ${each.city}, ${each.state} ${each.zipcode}`
	}))

	const newListing = createDefaultListing()

	const deleteRoom = (i: number) =>
		(newListing.rooms = [...newListing.rooms.slice(0, i), ...newListing.rooms.slice(i + 1)])
</script>

<Modal
	bind:open={createListing}
	hasForm
	modalHeading="Create Listing"
	primaryButtonText="Create"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (createListing = false)}
	on:open
	on:close
	on:submit
>
	<Form on:submit>
		<FormGroup>
			<TextInput labelText="MLS Number" placeholder="1234567" />
		</FormGroup>
		<FormGroup legendText="Images">
			<Images />
		</FormGroup>
		<FormGroup>
			<Row>
				<Column sm={4} md={4} lg={6}>
					<TextInput labelText="Street Address" placeholder="123 Main Street" />
				</Column>
				<Column sm={4} md={4} lg={4}>
					<TextInput labelText="City" placeholder="New York" />
				</Column>
				<Column sm={4} md={4} lg={3}>
					<TextInput labelText="State" placeholder="NY" />
				</Column>
				<Column sm={4} md={4} lg={3}>
					<TextInput labelText="Zip Code" placeholder="000000" />
				</Column>
			</Row>
		</FormGroup>
		<FormGroup>
			<TextArea
				labelText="Description"
				placeholder="A brief description of the listed property..."
			/>
		</FormGroup>
		<FormGroup legendText="Room Information">
			<Grid noGutter fullWidth>
				<Row>
					<Column sm={4} md={5} lg={5} style="padding-right: 5px">
						<NumberInput label="Bedrooms" min={0} />
					</Column>
					<Column sm={4} md={3} lg={5} style="padding-right: 5px">
						<NumberInput label="Bathrooms" step={0.5} min={0} />
					</Column>
					<Column sm={4} md={8} lg={{ span: 5, offset: 1 }}>
						<Button
							on:click={() =>
								(newListing.rooms = [...newListing.rooms, { name: '', description: '' }])}
							icon={Add16}
							size="field"
							style="max-width: 100%; width: 100%; margin-top: 24px"
							kind="tertiary"
						>
							Add Room
						</Button>
					</Column>
				</Row>
			</Grid>
			{#each newListing.rooms as room, i (i)}
				<Row style="margin-top: 1em">
					<Column>
						<Room bind:room on:delete={() => deleteRoom(i)} />
					</Column>
				</Row>
			{:else}
				<Row>
					<Column>
						<Tile
							style="text-align: center; margin-top: 1em; border: 1px solid var(--cds-ui-05,#161616);"
						>
							<Robot fill="var(--cds-brand-01)" height="96" width="96" />
							<p>There are no rooms. Add one with the button above.</p>
						</Tile>
					</Column>
				</Row>
			{/each}
		</FormGroup>

		<FormGroup legendText="School Information" />
	</Form>
</Modal>

<DataTable sortable {headers} {rows}>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch />
			<Button icon={Add16} on:click={() => (createListing = true)}>Create Listing</Button>
		</ToolbarContent>
	</Toolbar>
</DataTable>

<style>
	:global(.bx--number__input-wrapper > input) {
		padding-right: 16px !important;
	}
</style>
