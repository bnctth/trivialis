<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg">
	<nav>
		<!-- <span>Ajánlott modellek</span> -->
		<div class="account">
			{#if data.user}
				<span>{data.user.name}</span>
				<a href="/logout"><span>Kijelentkezés</span></a>
			{:else}
				<a href="/auth/login"><span>Bejelentkezés</span></a>
			{/if}
		</div>
	</nav>
	<slot />
</div>

<style>
	.bg {
		background: #3e4d5c;
		min-height: 100vh;
	}
	nav {
		height: 6vh;
		width: 100vw;
		position: fixed;
		top: 0;
		background: #2c3742;
		display: flex;
		justify-content: right;
		align-items: center;
		z-index: 999;
	}
	.account {
		height: 100%;
		background: #6f89a3;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.account span{
		padding: 0 10px;
	}
	*{
		color: #fff;
		text-decoration: none;
	}
</style>
