import adapter from '@sveltejs/adapter-auto';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import Icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		enhancedImages(),
		vitePreprocess(),
		Icons({
			compiler: 'svelte'
		})
	],

	kit: {
		alias: {
			'@/*': './path/to/lib/*'
		},
		adapter: adapter()
	}
};

export default config;
