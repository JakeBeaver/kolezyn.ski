<script lang="ts">
	import { publishMessage } from '../../utils/rtdb/rtdb';
	import { Button, FormGroup, Icon, Input, Label, Spinner, Styles } from 'sveltestrap';
	import { derived, writable } from 'svelte/store';
	import { auth } from '../../utils/auth/firebaseConfig';

	let message = '';
	enum status {
		init,
		sending,
		success,
		fail
	}
	let publishing = writable(status.init);
	
	export let uid = auth.currentUser.uid;
	
	async function publish() {
		publishing.set(status.sending);
		try {
			await publishMessage(message, uid);
			publishing.set(status.success);
			message = '';
		} catch (error) {
			publishing.set(status.fail);
			console.log(JSON.stringify(error));
		}
	}

	let isSending = derived(publishing, (x) => x == status.sending);
	let isFailed = derived(publishing, (x) => x == status.fail);
	let isSuccess = derived(publishing, (x) => x === status.success);
</script>

<FormGroup>
	<Label for="messageText">
		{#if $isFailed}
			<span class="text-warning">
				<Icon name="exclamation-triangle-fill" />
				Something went wrong
			</span>
		{:else if $isSuccess}
			<span class="text-success">
				<Icon name="check" />
				Message sent!
			</span>
		{:else}
			Type your message below
		{/if}
	</Label>
	<Input type="textarea" name="text" id="messageText" bind:value={message} />
</FormGroup>
<Button disabled={$isSending || !message} block on:click={publish}>
	{#if $isSending}
		<Spinner size="sm" />
	{:else}
		Send
	{/if}
</Button>
