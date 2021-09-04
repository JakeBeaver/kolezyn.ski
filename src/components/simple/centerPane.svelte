<script>
	export let width = 1;
	export let height = 1;
	export let center = false;
</script>

<div class="flex flex-col h-screen">
	<div
		style="width: {width}; height: {height}"
		class="m-auto bg-gray-700 rounded-lg opacity-80 flex text-white"
	>
		<div class:m-auto={center}>
			<slot />
		</div>
	</div>
</div>
