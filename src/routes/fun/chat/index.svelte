<script lang="ts">
	import Center from '../../../components/simple/center.svelte';
	import { fly, scale } from 'svelte/transition';
	import { circOut, elasticOut } from 'svelte/easing';
	import Pane from '../../../components/simple/pane.svelte';
	import UserContext from '../../../components/auth/userContext.svelte';
	import LoginButton from '../../../components/auth/loginButton.svelte';
	import PostMessage from '../../../components/chat/postMessage.svelte'
</script>

<div class="goToCorner">
	<LoginButton />
</div>

<Center>
	<UserContext let:user>
		{#if !user.isLoggedIn}
			<div
				out:fly={{
					duration: 1000,
					y: -200,
					easing: circOut
				}}
			>
				<Pane width={300} height={100}>
					<p class="text-3xl font-bold opacity-100">Sign in to chat</p>
				</Pane>
			</div>
		{:else}
			<PostMessage />
		{/if}
	</UserContext>
</Center>

<style>
	.goToCorner {
		z-index: 10000;
		right: 10px;
		top: 10px;
		position: fixed;
	}
</style>
