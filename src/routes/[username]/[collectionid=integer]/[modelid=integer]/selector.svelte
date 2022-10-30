<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	export let selected;
	let page = 0;
	$: pageStart = page * 4;
	$: pageEnd = Math.min((page + 1) * 4, data.collection.models.length);
	$: selectable = data.collection.models.slice(pageStart, pageEnd);
	$: maxPage = Math.floor((data.collection.models.length - 1) / 4);
</script>

<div class="flex vertical">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			on:click={() => (page = Math.max(page - 1, 0))}
			width="30"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
			/></svg
		>
		{#each selectable as model (model.id)}
			<a href="./{model.id}">
				<div class="selectable" class:selected={model.id == +data.modelid} style="background: url({model.photo}); background-size: cover;">
					<span class="txtbg">{model.title}</span>
				</div>
			</a>
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			on:click={() => (page = Math.min(page + 1, maxPage))}
			width="30"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
			/></svg
		>
	</div>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.vertical {
		flex-direction: column;
	}
	.selected {
		border: #6f89a3 5px solid;
	}
	a {
		color: #000;
		text-decoration: none;
	}
	.selectable {
		background: #fff;
		border-radius: 25px;
		height: 15vh;
		width: 20vh;
		margin: 15px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.txtbg{
		background: #ffffff88;
		padding: 0 2px;
		border-radius: 10px;
	}
</style>

