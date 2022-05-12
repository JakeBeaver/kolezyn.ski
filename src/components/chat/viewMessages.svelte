<script lang="ts">
	import { Card } from 'sveltestrap';
	import { getMyMessagesStore } from '../../utils/rtdb/rtdb';
	const messages = getMyMessagesStore();
</script>


{#each $messages || [] as message}
	<Card>
		{message.message}
	</Card>
{/each}
