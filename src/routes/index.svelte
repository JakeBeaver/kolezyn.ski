<script lang="ts">
	import CenterPane from '../components/simple/CenterPane.svelte';
	import IconSwarm from '../components/simpleKinematics/iconSwarm.svelte';
	import Cube from '../components/simpleKinematics/cube.svelte';
	import { fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';

	let show = true;
</script>


{#if show}
	<div out:fly={{ duration: 1000, y: -100, easing: circOut }}>
		<CenterPane
			on:click={(x) => {
				show = false;
			}}
			width={300}
			height={100}
			center
		>
			<p class="text-3xl font-bold opacity-100">Hi, I'm Jake!</p>
		</CenterPane>
	</div>
{/if}

<IconSwarm>
	<Cube />
</IconSwarm>
