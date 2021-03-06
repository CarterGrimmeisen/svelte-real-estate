import { optimizeImports } from 'carbon-preprocess-svelte'
import preprocess from 'svelte-preprocess'
import { Server } from 'http'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), optimizeImports()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		paths: {
			assets: 'node_modules/carbon-components-svelte/css'
		},
		vite: {
			optimizeDeps: {
				include: ['clipboard-copy']
			},
		}
	}
}

export default config
