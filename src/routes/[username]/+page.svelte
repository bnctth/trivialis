<script lang="ts">
	import type { PageData } from './$types';
	import profilepic from '$lib/profilepic.png';
	import Layout from '../+layout.svelte';

	export let data: PageData;
	let page = 0;
	$: pageStart = page * 5;
	$: pageEnd = Math.min(data.collections.length, (page + 1) * 5);
	$: maxPage = Math.floor((data.collections.length - 1) / 5);

	$: selectable = data.collections.slice(pageStart, pageEnd);
</script>

<div class="flex vertical fullsize">
	<div class="flex vertical">
		<div class="filler" />
		<div class="flex padded vertical">
			<div class="flex left">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img height="200" class="rounded" src={profilepic} />
				<span class="name">{data.name}</span>
			</div>
			<p class="bio">{data.bio??''}</p>
		</div>
	</div>
	<div class="flex selector">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			on:click={() => (page = Math.max(page - 1, 0))}
			width="30"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 512"
			><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"
			/></svg
		>
		{#each selectable as collection (collection.id)}
			{#if collection.models.length != 0}
				<a href="{data.username}/{collection.id}/{collection.models[0].id}">
					<div class="selectable">
						<span>{collection.title}</span>
					</div>
				</a>
			{/if}
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			on:click={() => (page = Math.min(page + 1, maxPage))}
			width="30"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 512"
			><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
			/></svg
		>
	</div>
</div>

<style>
	.fullsize {
		height: 100vh;
		padding: 30px;
		position: absolute;
	}
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.vertical {
		flex-direction: column;
	}
	.filler {
		background: #6f89a3;
		height: 20vh;
		width: 100vw;
		position: fixed;
		top: 0;
	}
	.left {
		justify-content: start;
		gap: 5vw;
	}
	.padded {
		position: relative;
		padding-top: 8vh;
		padding-left: 10vw;
		height: 50vh;
	}
	.rounded {
		clip-path: circle();
	}
	.name {
		color: #fff;
		font-size: x-large;
	}
	.selector {
		margin: 5vh 20vw;
	}
	a {
		color: #000;
		text-decoration: none;
	}
	.selectable {
		background: #fff;
		border-radius: 25px;
		height: 20vh;
		width: 15vw;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.bio{
		width: 80vw;
		text-align: justify;
		color: #fff;
		align-self: flex-start;
		margin-top: 7vh;
	}
</style>
