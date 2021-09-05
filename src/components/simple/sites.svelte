<script lang="ts">
	class data {
		constructor(public image: string, public name: string, public url: string) {}
	}
	let sites = [
		new data('linkedin.ico', 'LinkedIn', 'https://www.linkedin.com/in/jakubkolezynski'),
		new data(
			'playstore.png',
			'Google Play',
			'https://play.google.com/store/apps/developer?id=Jake+Beaver'
		),
		new data('github.svg', 'GitHub', 'https://github.com/JakeBeaver'),
		new data('instagram.png', 'Istagram', 'https://www.instagram.com/jay_beaver/'),
		new data('bandcamp.png', 'Bandcamp', 'https://jakebeaver.bandcamp.com/')
	];
</script>

<div class="justify-around flex flex-grow">
	{#each sites as site}
		<a class="inline max-w-50 float-left" href={site.url}>
			<img src={`/images/sites/${site.image}`} alt={site.name} width="50" height="50" />
        </a>
	{/each}
</div>
