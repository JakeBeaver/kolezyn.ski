<script lang="ts">
	import { user } from '../../utils/auth/firebase';
	import { Card } from 'sveltestrap';
	import { messages } from '../../utils/rtdb/rtdb';
	import UserIcon from '../auth/userIcon.svelte';
</script>

{#each $messages || [] as message}
	<div class="wrapper">
		<div
			class="bubble"
			class:r={message.email === $user.email}
			class:l={message.email !== $user.email}
		>
			<Card inverse color={message.email === $user.email ? 'success' : 'secondary'}>
				<span class="table-cell content">
					{#if message.email !== $user.email }
					<UserIcon user={{ name: message.name, uri: message.pic }} />
					{/if}
					<span class="text">
						{message.message}
					</span>
				</span>
				<span class="date">
					{message.timestamp.toLocaleString()}
				</span>
			</Card>
		</div>
	</div>
{/each}

<style>
	.content {
		padding: 3px;
	}
	.wrapper {
		width: 100%;
		float: left;
	}
	.bubble {
		display: table-cell;
		max-width: 75%;
		min-width: 20%;
		padding: 2px;
	}
	.bubble.r {
		float: right;
	}
	.bubble.l {
		float: left;
	}
	.text {
		display: table-cell;
		padding: 5px;
		margin-left: 10px;
		color: white;
	}
	.date{
		font-size: 10;
		margin: 0 4 2 4
	}
</style>
