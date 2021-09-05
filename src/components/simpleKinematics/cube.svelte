<script>
	export let color = "rgba(0, 240, 240, 1)";
	let faceStyle = `background: ${color}`;
</script>


<div class="cube">
	<div class="top" style={faceStyle}>
		<slot name="top" />
		<slot />
	</div>
	<div class="bottom" style={faceStyle}>
		<slot name="bottom" />
		<slot />
	</div>
	<div class="left" style={faceStyle}>
		<slot name="left" />
		<slot />
	</div>
	<div class="right" style={faceStyle}>
		<slot name="right" />
		<slot />
	</div>
	<div class="front" style={faceStyle}>
		<slot name="front" />
		<slot />
	</div>
	<div class="back" style={faceStyle}>
		<slot name="back" />
		<slot />
	</div>
</div>

<style>
	.cube {
		transform-style: preserve-3d;
		animation: spin 10s infinite linear;
		position: relative;
		width: 100px;
		height: 100px;
		top: 50%;
		left: 50%;
		margin-left: -50px;
		margin-top: -50px;
	}

	.cube div {
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 1);
		display: block;
		position: absolute;
	}

	.cube div.top {
		transform: rotateX(90deg);
		margin-top: -50px;
	}

	.cube div.right {
		transform: rotateY(90deg);
		margin-left: 50px;
	}

	.cube div.bottom {
		transform: rotateX(-90deg);
		margin-top: 50px;
	}

	.cube div.left {
		transform: rotateY(-90deg);
		margin-left: -50px;
	}

	.cube div.front {
		transform: translateZ(50px);
	}

	.cube div.back {
		transform: translateZ(-50px) rotateX(180deg);
	}

	@keyframes spin {
		0% {
			transform: rotateX(-20deg) rotateY(20deg);
		}
		100% {
			transform: rotateX(700deg) rotateY(740deg);
		}
	}
</style>
