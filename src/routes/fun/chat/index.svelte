<script lang="ts">
	import { Col, Container, Input, Row } from 'sveltestrap';
	import Center from '../../../components/simple/center.svelte';
	import { fly, scale } from 'svelte/transition';
	import { circOut, elasticOut } from 'svelte/easing';
	import Pane from '../../../components/simple/pane.svelte';
	import UserContext from '../../../components/auth/userContext.svelte';
	import LoginButton from '../../../components/auth/loginButton.svelte';
	import PostMessage from '../../../components/chat/postMessage.svelte';
	import ViewMessages from '../../../components/chat/viewMessages.svelte';
</script>

<div class="goToCorner">
	<LoginButton />
</div>
<div style="height: 80" />
<UserContext let:user>
	{#if !user}
		<Center>
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
		</Center>
	{:else}
		<Container>
			<Col>
				<ViewMessages />
			</Col>
			<Col>
				<PostMessage />
			</Col>
		</Container>
	{/if}
</UserContext>

<style>
	.goToCorner {
		z-index: 10000;
		right: 10px;
		top: 10px;
		position: fixed;
	}
</style>
