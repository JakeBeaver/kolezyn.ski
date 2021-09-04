<script>
	import Background from '../components/webgl/background.svelte';
	import CenterPane from '../components/simple/centerPane.svelte';
	import { fly } from 'svelte/transition';
	import { circOut } from 'svelte/easing';
	let show = true;
</script>

<Background />

{#if show}
	<div out:fly={{duration:1000, y:-100, easing: circOut}}>
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
