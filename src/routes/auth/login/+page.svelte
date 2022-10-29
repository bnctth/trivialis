<script>
	import { enhance } from "$app/forms";
    let username='';
    let password='';
</script>
<form action="?/login" use:enhance>
<label for="username">Username</label>
<input type="text" id="username" bind:value={username}/>
<label for="password">Password</label>
<input type="password" id="password" bind:value={password}/>
<submit>Login</submit>
<a href="../signup">If you are a new user...</a>
</form>