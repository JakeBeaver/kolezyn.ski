<script lang="ts">
	import HasJs from '../../utils/hasJs/hasJs.svelte';
	import { Spinner } from 'sveltestrap';
	import { logIn, logOut, user } from '../../utils/auth/firebase';
	import UserIcon from './userIcon.svelte';
	const googleImgLink = 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg';
	let hasJs: boolean;
</script>

<HasJs bind:hasJs />
{#if $user === undefined || !hasJs}
	<button class="fire-button">
		<span class="img-wrapper">
			<img class="google-img" alt="google" src={googleImgLink} />
		</span>
		<span class="text text-long">
			{#if hasJs}
				<Spinner />
			{:else}
				<Spinner type="grow" />
			{/if}
		</span>
	</button>
{:else if $user === null}
	<button class="fire-button" on:click={logIn}>
		<span class="img-wrapper">
			<img class="google-img" alt="google" src={googleImgLink} />
		</span>
		<span class="text text-long">Sign in with Google</span>
		<span class="text text-short">Sign in </span>
	</button>
{:else}
	<button class="fire-button" on:click={logOut}>
		<UserIcon user={{ name: $user.displayName, uri: $user.photoURL }} />
		<span class="text text-long">{$user.displayName} (Sign&nbsp;out)</span>
		<span class="text text-short">Sign&nbsp;out</span>
	</button>
{/if}

<style>
	.img-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.google-img {
		border: none;
		display: inline-block;
		height: 18px;
		vertical-align: middle;
		width: 18px;
	}
	.text {
		color: #fff;
		display: table-cell;
		font-size: 14px;
		padding-left: 16px;
		text-transform: none;
		vertical-align: middle;
	}

	.text.text-long {
		display: table-cell;
	}

	.text.text-short {
		display: none;
	}

	@media (max-width: 210px) {
		.text.text-long {
			display: none;
		}

		.text.text-short {
			display: table-cell;
		}
	}

	.fire-button > .text {
		color: #757575;
	}

	.fire-button {
		border-radius: 0.7em;
		direction: ltr;
		font-weight: 500;
		height: auto;
		line-height: normal;
		max-width: 220px;
		min-height: 40px;
		padding: 8px 16px;
		text-align: left;
		width: 100%;
		background-color: white;
	}
</style>
