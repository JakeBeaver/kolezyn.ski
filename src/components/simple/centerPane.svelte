<script>
	import { zIndex } from '../../helpers/zIndexCalculator';
	import { createEventDispatcher } from 'svelte';
	export let width = 1;
	export let height = 1;
	export let center = false;
	let fire = createEventDispatcher();
	let click = (x) => fire('click', x);
</script>

<div class="relative flex flex-col h-screen">
	<div
		on:click
		style="width: {width}; height: {height}; z-index: {zIndex(1)}"
		class="m-auto bg-gray-700 rounded-lg opacity-80 flex text-white"
	>
		<div class:m-auto={center}>
			<slot />
		</div>
	</div>
</div>
