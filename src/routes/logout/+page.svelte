<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	invalidateAll();
	goto('/');
</script>

<h1>Logging out...</h1>
