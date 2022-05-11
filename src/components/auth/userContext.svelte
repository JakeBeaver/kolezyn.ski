<script lang="ts">
	import { user } from '../../utils/auth/firebase';
</script>

<slot user={$user} />