
import adapter from '@sveltejs/adapter-static';

import preprocess from 'svelte-preprocess';
import { windi } from 'svelte-windicss-preprocess';

export default {
	preprocess: [
		windi({}),
		preprocess(),
	],
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		target: '#svelte'
	},
};
