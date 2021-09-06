<script lang="ts">
	import Center from '../components/simple/center.svelte';
	import Pane from '../components/simple/pane.svelte';
	import Sites from '../components/simple/sites.svelte';
	import IconSwarm from '../components/simpleKinematics/iconSwarm.svelte';
	import Cube from '../components/simpleKinematics/cube.svelte';
	import { fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	import { zIndex } from '../helpers/zIndexCalculator';
	import { onMount } from 'svelte';

	let show = true;
	onMount(() => {
		setTimeout(() => {
			show = false;
		}, 2000);
		return () => {};
	});
</script>

<IconSwarm>
	<Cube />
</IconSwarm>
<div class="fixed" style="z-index:{zIndex(1)}">
	{#if show}
		<Center>
			<div out:fly={{ duration: 1000, y: -100, easing: circOut }}>
				<Pane
					on:click={(x) => {
						show = false;
					}}
					width={300}
					height={100}
				>
					<p class="text-3xl font-bold opacity-100">Hi, I'm Jake!</p>
				</Pane>
			</div>
		</Center>
	{:else}
		<Center>
			<div in:fly={{ delay: 500, duration: 1000, y: 100, easing: circOut }}>
				<Pane width={350} height={150}>
					<Sites />
				</Pane>
			</div>
		</Center>
	{/if}
</div>
