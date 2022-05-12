<script lang="ts">
	import { publishMessage } from '../../utils/rtdb/rtdb';
	import { Button, FormGroup, Icon, Input, Label, Spinner, Styles } from 'sveltestrap';
	import { derived, writable } from 'svelte/store';

	let message = '';
	enum status {
		init,
		sending,
		success,
		fail
	}
	let publishing = writable(status.init);

	async function publish() {
		publishing.set(status.sending);
		try {
			await publishMessage(message);
			publishing.set(status.success);
			message = '';
		} catch {
			publishing.set(status.fail);
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
