<script lang="ts">
	import { Tile, TextInput, TextArea, Row, Button, Column, Tooltip } from 'carbon-components-svelte'
	import { Edit16, CheckmarkFilled16, TrashCan16 } from 'carbon-icons-svelte'
	import { onMount, createEventDispatcher } from 'svelte'

	import type { Room } from '@prisma/client'

	export let room: Pick<Room, 'name' | 'description'>

	const dispatch = createEventDispatcher()
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
				icon={editing ? CheckmarkFilled16 : Edit16}
				iconDescription={editing ? 'Stop Editing Room' : 'Edit Room'}
				on:click={() => (editing = !editing)}
			/>

			<Button
				kind="danger"
				size="small"
				tooltipPosition="left"
				icon={TrashCan16}
				iconDescription="Delete Room"
				on:click={() => dispatch('delete')}
			/>
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
