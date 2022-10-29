<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form:ActionData;

	if (form?.success) invalidateAll();
</script>

<div class="row">
	<div class="col">
		{#if form?.missingName}
		<div class="alert alert-warning alert-dismissible fade show" role="alert">
			You need to give a name
			<button type="button" class="btn" data-bs-dismiss="alert"></button>
		</div>
		{/if}
		{#if form?.missingUsername}
		<div class="alert alert-warning alert-dismissible fade show" role="alert">
			You need to give a username
			<button type="button" class="btn" data-bs-dismiss="alert"></button>
		</div>
		{/if}
		{#if form?.missingPassword}
		<div class="alert alert-warning alert-dismissible fade show" role="alert">
			You need to give a password
			<button type="button" class="btn" data-bs-dismiss="alert"></button>
		</div>
		{/if}
		{#if form?.alreadyTaken}
		<div class="alert alert-warning alert-dismissible fade show" role="alert">
			Username is already taken.
			<button type="button" class="btn" data-bs-dismiss="alert"></button>
		</div>
		{/if}
	</div>
</div>

<form action="?/login" method="POST" use:enhance>
	<div class="row g-3">
		<div class="mb-auto">
			<label for="name" class="visually-hidden">Name</label>
			<input name="name" id="name" type="text" class="form-control" placeholder="Name">
		</div>
		<div class="mb-auto">
			<label for="username" class="visually-hidden">Username</label>
			<input name="username" id="username" type="text" class="form-control" placeholder="Username">
		</div>
		<div class="mb-auto">
			<label for="password" class="visually-hidden">Password</label>
			<input name="password" id="password" type="password" class="form-control" placeholder="Password">
		</div>
		<div class="d-grid gap-2">
			<button type="submit" class="btn btn-primary mb-3">Login</button>
		</div>
	</div>
</form>
<a href="./login">If you already have an account...</a>
