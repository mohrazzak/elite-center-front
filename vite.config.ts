// vite.config.js
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

import Icons from 'unplugin-icons/vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    port: 5173,       // Use port 5173
    strictPort: true, // Ensure it uses the specified port
  },
	plugins: [
		sveltekit(),
		enhancedImages(),
		Icons({
			compiler: 'svelte'
		})
	]
});
