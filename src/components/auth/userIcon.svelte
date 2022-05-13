<script lang="ts">
	export let user: { uri: string; name: string };
</script>

<span class="img-wrapper">
	<img class="profile-img" alt={user.name} src={user.uri} />
</span>

<style>
	.img-wrapper {
        vertical-align: middle;
		display: table-cell;
        object-fit: cover;
        height: 40px;
        width: 40px;
	}
    
	.profile-img {
        border-radius: 50%;
	}
</style>
