<script lang="ts">
	import Selector from './selector.svelte';

	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let data: PageData;
	$: selected = data.collection.models.findIndex((m) => m.id == +data.modelid);
	$: {
		selected;
		showComments = false;
	}
	const like = async () => {
		await fetch(`${data.modelid}/like`, {
			method: 'POST'
		});
		invalidateAll();
	};
	let showComments = false;
	$: disabled=!data.userid;
</script>

<div class="flex fullsize">
	<div class="flex vertical">
		<div class="flex toppadding">
			<a href="/{data.collection.owner.username}" class="capsule">{data.collection.owner.name}</a>
			<span class="capsule">{data.collection.title}</span>
		</div>
		<div class="separator" />
		<div class="viewer">
			{#if showComments}
				<div class="comment-section">
					<!-- svelte-ignore a11y-missing-attribute -->
					<svg
						on:click={() => (showComments = false)}
						class="button x"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 320 512"
						><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
							d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
						/></svg
					>
					<form action="?/comment" use:enhance>
						<input {disabled} name="content" id="content" placeholder="{disabled?'Please log in to comment':'Your comment'}" class="comminput" />
						<button {disabled} type="submit" class="send"
							><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
								><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
									d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L277.3 424.9l-40.1 74.5c-5.2 9.7-16.3 14.6-27 11.9S192 499 192 488V392c0-5.3 1.8-10.5 5.1-14.7L362.4 164.7c2.5-7.1-6.5-14.3-13-8.4L170.4 318.2l-32 28.9 0 0c-9.2 8.3-22.3 10.6-33.8 5.8l-85-35.4C8.4 312.8 .8 302.2 .1 290s5.5-23.7 16.1-29.8l448-256c10.7-6.1 23.9-5.5 34 1.4z"
								/></svg
							></button
						>
					</form>
					<div class="comments flex vertical">
						{#each data.collection.models[selected].comments as comment (comment.id)}
							<div class="comment">
								<a href="/{comment.sender.username}">{comment.sender.name}</a>
								<p>{comment.content}</p>
							</div>
						{/each}
					</div>
				</div>
			{/if}

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
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click={() => (showComments = true)}>Comments</span>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click={like} class:red={data.collection.models[selected].likes?.length ?? 0 != 0}
						>{#if data.collection.models[selected].likes?.length ?? 0 != 0}🤍{:else}❤️{/if}</span
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
	.comment-section {
		height: 100%;
		width: 100%;
		padding: 20px;
		position: absolute;
		background-color: #fff;
		box-shadow: 5px 5px 5px;
		height: 74vh;
		width: 30vw;
		border-radius: 25px;
		right: 28vw;
		top: 23vh;
	}
	.comments {
		margin: 100px 0;
		overflow-y: scroll;
		gap: 30px;
		align-items: flex-start;
		justify-content: start;
	}
	.comment {
		background: #6f89a3;
		padding: 5px 20px;
		border-radius: 25px;
	}
	.x {
		position: fixed;
	}
	.comminput {
		border: solid 1px #6f89a3;
		border-radius: 15px;
		width: 90%;
		padding: 2px 5px;
	}
	form {
		display: flex;
		justify-content: space-between;
		width: 27vw;
		gap: 10px;
		position: absolute;
		top:8vh;
	}

	.send {
		background: transparent;
		border: none;
	}
</style>
