<script lang="ts">
    import {animate} from './background'
	import { onMount } from 'svelte';

	export let orbitCamera = false;
	export let error = false;
	onMount(()=>animate(error, orbitCamera));
</script>

<canvas class="" name="index" id="bg" />

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -2;
	}
</style>
