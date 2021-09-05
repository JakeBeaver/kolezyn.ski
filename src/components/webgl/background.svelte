<script lang="ts">
    import {animate} from './background'
	import { onMount } from 'svelte';
	import {zIndex} from '../../helpers/zIndexCalculator'

	export let orbitCamera = false;
	export let error = false;
	onMount(()=>animate(error, orbitCamera));
</script>

<canvas style="z-index:{zIndex(-1)};"  name="index" id="bg" />

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
