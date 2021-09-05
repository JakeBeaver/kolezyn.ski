<div class="cube">
	<div class="top"><slot name="top" /></div>
	<div class="bottom"><slot name="bottom" /></div>
	<div class="left"><slot name="left" /></div>
	<div class="right"><slot name="right" /></div>
	<div class="front"><slot name="front" /></div>
	<div class="back"><slot name="back" /></div>
</div>

<style>
	.cube {
		-webkit-transform-style: preserve-3d;
		-webkit-animation: spin 10s infinite linear;
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
		background: rgb(3, 200, 184);
		display: block;
		position: absolute;
	}

	.cube div.top {
		-webkit-transform: rotateX(90deg);
		margin-top: -50px;
	}

	.cube div.right {
		-webkit-transform: rotateY(90deg);
		margin-left: 50px;
	}

	.cube div.bottom {
		-webkit-transform: rotateX(-90deg);
		margin-top: 50px;
	}

	.cube div.left {
		-webkit-transform: rotateY(-90deg);
		margin-left: -50px;
	}

	.cube div.front {
		-webkit-transform: translateZ(50px);
	}

	.cube div.back {
		-webkit-transform: translateZ(-50px) rotateX(180deg);
	}

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotateX(-20deg) rotateY(20deg);
		}
		100% {
			-webkit-transform: rotateX(700deg) rotateY(740deg);
		}
	}
</style>
