<script lang="ts">
	import { Badge, Card, Col, Container, Input, Row, Spinner } from 'sveltestrap';
	import Center from '../../../components/simple/center.svelte';
	import { fly, scale } from 'svelte/transition';
	import { circOut, elasticOut } from 'svelte/easing';
	import Pane from '../../../components/simple/pane.svelte';
	import LoginButton from '../../../components/auth/loginButton.svelte';
	import PostMessage from '../../../components/chat/postMessage.svelte';
	import ViewMessages from '../../../components/chat/viewMessages.svelte';
	import { user } from '../../../utils/auth/firebase';
	import HasJs from '../../../utils/hasJs/hasJs.svelte';
	import { selectedUid, slots } from '../../../utils/rtdb/rtdb';
	import { derived } from 'svelte/store';
	import UserIcon from '../../../components/auth/userIcon.svelte';
	import ReCaptchaV3 from '../../../utils/auth/ReCaptchaV3.svelte';
	let hasJs;
	const isUserSelected = derived(selectedUid, (x) => !!x);
	const hasOptions = derived(slots, (x) => x.length > 1);
</script>

<ReCaptchaV3 />



<div class="goToCorner">
	<LoginButton />
</div>
<div style="height: 80" />
<HasJs bind:hasJs />
{#if !hasJs || $user === undefined}
	<Center><Spinner type="grow" /></Center>
{:else if !$user}
	<Center>
		<div
			out:fly={{
				duration: 1000,
				y: -200,
				easing: circOut
			}}
		>
			<Pane width={200} height={100}>
				<p class="text-3xl font-bold opacity-100">Sign in to access chat</p>
			</Pane>
		</div>
	</Center>
{:else}
	<div class="wrapper">
		<Container>
			<Row>
				{#if $hasOptions}
					<Col sm="4">
						{#each $slots as slot}
							<Card
								color={$selectedUid === slot.uid ? 'secondary' : 'light'}
								on:click={() => selectedUid.set(slot.uid)}
							>
								<div class="cont">
									<span class="float-left">
										<UserIcon user={{ name: slot.name, uri: slot.pic }} />
										<span class="text">
											{slot.name}
										</span>
										<span>
											({slot.email})
										</span>
									</span>
									<span class="float-right badge">
										<Badge color={$selectedUid !== slot.uid ? 'secondary' : 'light'}
											>{slot.messages.length.toString()}</Badge
										>
									</span>
								</div>
							</Card>
						{/each}
						<div class="h-6" />
					</Col>
				{/if}
				{#if $isUserSelected}
					<Col sm={$hasOptions ? '8' : '12'}>
						<ViewMessages />
						<PostMessage uid={$selectedUid} />
					</Col>
				{/if}
			</Row>
		</Container>
	</div>
{/if}

<style>
	.wrapper {
		padding-bottom: 15px;
	}

	.badge {
		font-size: 30;
	}
	.cont {
		padding: 8px 16px;
	}
	.text {
		color: #fff;
		display: table-cell;
		padding-left: 16px;
		vertical-align: middle;
	}

	.goToCorner {
		z-index: 10000;
		right: 10px;
		top: 10px;
		position: fixed;
	}
</style>
