<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: selected = data.collection.models.findIndex((m) => m.id == +data.modelid);
</script>

{data.collection.owner.name}
{data.collection.title}
{data.collection.models[selected].title}
{data.collection.models[selected].tags}
<iframe src={data.collection.models[selected].link} />
{#each data.collection.models as model, i (model.id)}
	<a href="./{model.id}">
		{#if i == selected} a kiválasztottra vonatkozik csak{/if}
		{model.title}
	</a>
{/each}
