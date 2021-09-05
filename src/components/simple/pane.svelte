<script>
	import { createEventDispatcher } from 'svelte';
	export let width = 1;
	export let height = 1;
	let fire = createEventDispatcher();
	let click = (x) => fire('click', x);
</script>

<div style="width: {width}; height: {height}" on:click={click} class="text-white table">
	<div
		style="width: {width}; height: {height}"
		class="absolute bg-gray-700 rounded-lg opacity-80"
	/>
	<div class="relative table-cell align-middle text-center content-center">
		<slot />
	</div>
</div>
