<script lang="ts">
	import { OrbitingPoint } from './orbitingPoint';
	import { Position } from './simpleKinematics';
	import { onMount } from 'svelte';
	import { zIndexPx } from '../../helpers/zIndexCalculator';

	import { fade } from 'svelte/transition';

	export let orbitCenter: Position = new Position(0, 0, 0);
	export let radius: number = 25;
	let point = new OrbitingPoint(radius, orbitCenter, 1);
	let show = false;
	onMount(() => {
		show = true;
		let frame;
		function loop() {
			frame = requestAnimationFrame(loop);
			point.orbitFrame();
			point = point;
		}
		loop();
		return () => cancelAnimationFrame(frame);
	});
	$: depth = point.pos.z + orbitCenter.z;
</script>

{#if show}
	<div in:fade={{duration:1000}} class="pointer-events-none absolute left-0 top-0 w-screen flex flex-col h-screen">
		<div
			
			class="m-auto"
			style={`transform: translate(${point.pos.x}vw, ${point.pos.y}vh) scale(${
				1 - depth / radius / 3
			}); z-index:${zIndexPx(-depth)}`}
		>
			<slot />
		</div>
	</div>
{/if}
