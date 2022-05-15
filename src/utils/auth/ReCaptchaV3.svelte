<script lang="ts">
	import { onMount } from 'svelte';
	import { app } from './firebaseConfig';
	import { initializeAppCheck, ReCaptchaV3Provider } from '@firebase/app-check';

	onMount(() => {
		try {
			initializeAppCheck(app, {
				provider: new ReCaptchaV3Provider('6LcPw-4fAAAAAB3qFO3PeYBEsWaGWqUZ5Dz1pWd5'),
				isTokenAutoRefreshEnabled: true
			});
		} catch (error) {
			console.log(error);
		}
	});
</script>
