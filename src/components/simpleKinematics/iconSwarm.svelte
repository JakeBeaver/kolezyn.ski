<script lang="ts">
	import { Position } from './simpleKinematics';
	import Orbiting from './orbiting.svelte';
	import { zIndexPx } from '../../helpers/zIndexCalculator';
	export let orbitCenter: Position = new Position(0, 0, 0);
	export let radius: number = 25;

	const iconPaths = [
		'angular.svg',
		'cs.svg',
		'vscode.svg',
		'docker.png',
		'firebase.svg',
		'flutter.png',
		'powershell.png',
		'sql.svg',
		'vs.svg',
		'typescript.svg',
		'npm.svg',
		'jenkins.svg',
		'dotnet.svg',
		'git.svg',
		'svelte.png',
		'python.svg',
		'GCP.png',
		'mssql.png'
	];
</script>

{#each iconPaths as path}
	<Orbiting {orbitCenter} {radius}>
		<img src={`/images/skills/${path}`} width="40" alt={path} />
	</Orbiting>
{/each}

<div
	style="z-index:{zIndexPx(orbitCenter.z)}"
	class="pointer-events-none absolute left-0 top-0 w-screen flex flex-col h-screen"
>
	<div class="m-auto">
		<slot />
	</div>
</div>
