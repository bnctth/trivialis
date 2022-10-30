<script lang="ts">
	import Selector from './selector.svelte';

	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	$: selected = data.collection.models.findIndex((m) => m.id == +data.modelid);
	const like = async () => {
		await fetch(`${data.modelid}/like`, {
			method: 'POST'
		});
		invalidateAll();
	};
</script>

<div class="flex fullsize">
	<div class="flex vertical">
		<div class="flex toppadding">
			<a href="/{data.user.username}" class="capsule">{data.collection.owner.name}</a>
			<span class="capsule">{data.collection.title}</span>
		</div>
		<div class="separator" />
		<div class="viewer">
			<iframe src={data.collection.models[selected].link} title="3d viewer" />
			<div class="flex bottom">
				<div class="flex infos vertical">
					<span class="title">{data.collection.models[selected].title}</span>
					<div>
						{#each data.collection.models[selected].tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>
				<div class="flex buttons">
					<span>Comments</span>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click={like} class:red={data.collection.models[selected].likes.length != 0}
						>{#if data.collection.models[selected].likes.length != 0}🤍{:else}❤️{/if}</span
					>
				</div>
			</div>
		</div>
	</div>
	<Selector {selected} {data} />
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
	.bottom {
		background: #6f89a3;
		height: 10vh;
		border-radius: 0 0 25px 25px;
		justify-content: space-evenly;
		align-items: center;
		padding: 0 20px;
	}
	.buttons {
		justify-content: flex-end;
		gap: 2vw;
	}
	.buttons > * {
		border-radius: 15px;
		padding: 2px 5px;
		box-shadow: none;
		background: #c3c9ce;
	}
	.red {
		background: red;
	}
	.infos {
		justify-content: space-evenly;
		align-items: flex-start;
	}
	.toppadding {
		padding-top: 5vh;
	}
	.tag {
		background: #c3c9ce;
		padding: 3px 5px;
		margin: 0 10px;
		border-radius: 10px;
	}
	.title {
		margin-left: 10px;
		font-size: large;
	}

	a {
		color: #000;
		text-decoration: none;
	}
</style>
