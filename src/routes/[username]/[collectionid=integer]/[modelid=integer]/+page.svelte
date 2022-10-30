<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: selected = data.collection.models.findIndex((m) => m.id == +data.modelid);
</script>

<div class="flex fullsize">
	<div class="flex vertical">
		<div class="flex toppadding">
			<span class="capsule">{data.collection.owner.name}</span>
			<span class="capsule">{data.collection.title}</span>
		</div>
		<div class="separator" />
		<div class="viewer">
			<iframe src={data.collection.models[selected].link} />
			<div class="flex infos">
				{data.collection.models[selected].title}
				{data.collection.models[selected].tags}
			</div>
		</div>
	</div>
	<div class="flex">
		{#each data.collection.models as model, i (model.id)}
			<a href="./{model.id}">
				{#if i == selected} a kiválasztottra vonatkozik csak{/if}
				{model.title}
			</a>
		{/each}
	</div>
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
	.fullsize {
		height: 100vh;
		padding: 30px;
	}
	.capsule {
		padding: 10px 30px;
		background: #6f89a3;
		border-radius: 25px;
	}
	.viewer {
		border-radius: 25px;
		background-color: #ffffff;
		padding: 25px 0;
		height: 70vh;
		width: 70vw;
	}
	iframe {
		width: 70vw;
		height: 60vh;
	}
	.separator {
		height: 5vh;
	}
	.infos {
		background: #6f89a3;
		height: 10vh;
		border-radius: 0 0 25px 25px;
	}
	.toppadding {
		padding-top: 5vh;
	}
</style>
