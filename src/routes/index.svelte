<script lang="ts">
	import Center from '../components/simple/center.svelte';
	import Pane from '../components/simple/pane.svelte';
	import Sites from '../components/simple/sites.svelte';
	import IconSwarm from '../components/simpleKinematics/iconSwarm.svelte';
	import Cube from '../components/simpleKinematics/cube.svelte';
	import { fly, scale } from 'svelte/transition';
	import { circOut, elasticOut, sineOut } from 'svelte/easing';
	import { zIndex } from '../helpers/zIndexCalculator';
	import { onMount } from 'svelte';

	let show = true;
	let clicked = false;
	let acceptPointer = false;
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
			<div
				out:fly={{
					duration: clicked ? 1000 : 2000,
					y: -200,
					easing: clicked ? circOut : sineOut
				}}
				class="cursor-pointer"
			>
				<Pane
					on:click={(x) => {
						show = false;
						clicked = true;
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
			<div
				in:scale={{
					delay: clicked ? 50 : 50,
					duration: clicked ? 1500 : 4000,
					start: 2,
					easing: elasticOut
				}}
				on:introstart={() =>
					setTimeout(() => {
						acceptPointer = true;
					}, 200)}
				class:pointer-events-none={!acceptPointer}
			>
				<!-- <div in:fly={{ delay: 0, duration: 1000, y: 200, easing: circOut }}> -->
				<Pane width={350} height={150}>
					<Sites />
				</Pane>
			</div>
		</Center>
	{/if}
</div>
