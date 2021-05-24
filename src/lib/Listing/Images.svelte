<script lang="ts">
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
	import 'filepond/dist/filepond.min.css';
	import FilePond,{ registerPlugin } from 'svelte-filepond';

	registerPlugin(FilePondPluginImagePreview, )

	let pond: FilePond
</script>

<FilePond bind:this={pond} acceptedFileTypes="images/*" />

<style>
	:global(.filepond--root) {
		font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
	}

	:global(.filepond--panel-root) {
		background-color: var(--cds-field-02, #ffffff); 
		border-radius: 0;
		border-bottom: 1px solid var(--cds-ui-04, #8d8d8d);
	}
</style>