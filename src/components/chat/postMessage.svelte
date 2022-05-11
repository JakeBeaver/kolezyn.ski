<script lang="ts">
	import Pane from '../simple/pane.svelte';
	import { publishMessage } from '../../utils/rtdb/rtdb';
    let message = '';
</script>

<Pane height={400} width={350}>
	<div />
	<textarea rows="10" cols="40" bind:value={message}></textarea>
	<div on:click={() => publishMessage(message)} class="flat-button">Send</div>
</Pane>

<style>
    @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
	textarea {
		background: transparent;
		color: white;
		opacity: 1;
		resize: none;
	}

	.flat-button {
		position: relative;
		width: 250px;
		height: 60px;
		background: gray;
		margin: 0 auto;
		margin-top: 40px;
		overflow: hidden;
		z-index: 1;
		cursor: pointer;
		transition: color 0.3s;
		/* Typo */
		line-height: 60px;
		text-align: center;
		color: #fff;
	}

	.flat-button:after {
		position: absolute;
		top: 90%;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgb(161, 161, 161);
		content: '';
		z-index: -2;
		transition: transform 0.3s;
	}

	.flat-button:hover::after {
		transform: translateY(-80%);
		transition: transform 0.3s;
	}
</style>
