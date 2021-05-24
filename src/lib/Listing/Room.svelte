<script lang="ts">
	import type { Room } from '@prisma/client'

	import { Tile, TextInput, TextArea, Row, Button, Column } from 'carbon-components-svelte'
	import { Edit16, EditOff16 } from 'carbon-icons-svelte'
	import { onMount } from 'svelte'

	export let room: Pick<Room, 'name' | 'description'>

	let editing = false

	onMount(() => {
		editing = !room.name && !room.description
	})
</script>

<Tile style="border: 1px solid var(--cds-ui-05,#161616);">
	<Row style="margin-bottom: -1.5rem">
		<Column sm={{ span: 1, offset: 3 }} style="text-align: right">
			<Button
				kind="ghost"
				size="small"
				disabled={!room.name && !room.description}
				tooltipPosition="left"
				hasIconOnly
				iconDescription={editing ? 'Stop Editing Room' : 'Edit Room'}
				on:click={() => (editing = !editing)}
			>
				{#if editing}
					<EditOff16
						style={`fill: var(--cds-support-0${!room.name && !room.description ? '1' : '4'})`}
					/>
				{:else}
					<Edit16 />
				{/if}
			</Button>
		</Column>
	</Row>
	{#if editing}
		<TextInput
			bind:value={room.name}
			light
			size="sm"
			labelText="Room Name"
			placeholder="Room Name"
			style="margin-bottom: 1em"
		/>
		<TextArea
			bind:value={room.description}
			light
			labelText="Room Description"
			placeholder="A brief description of the particular room."
		/>
	{:else}
		<p>
			<strong>{room.name}</strong>
		</p>
		<p>{room.description}</p>
	{/if}
</Tile>
