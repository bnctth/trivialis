<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;

	if (form?.success) invalidateAll();
</script>

<form action="?/login" method="POST" use:enhance>
	<label for="username">Username</label>
	<input name="username" type="text" id="username" />
	{#if form?.missingUsername}You need to give a username{/if}
	<label for="password">Password</label>
	<input name="password" type="password" id="password" />
	{#if form?.missingPassword}You need to give a password{/if}
	<button type="submit">Login</button>
	{#if form?.wrongDetails}Wrong details.{/if}
</form>
<a href="../signup">If you are a new user...</a>
