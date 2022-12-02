<script lang="ts">
	import { todos } from '../stores/store';
</script>

<header class="p-[2rem] w-screen h-[max-content] bg-slate-100">
	<h4 class="text-[2rem]">Welcome back, Peter</h4>
	{#if $todos.length}
		<p class="mt-4 text-[.8rem] text-zinc-700">
			You've got {$todos.length} task coming up in next day's
		</p>
	{/if}

	{#if !$todos.length}
		<p class="mt-4 text-[.8rem] text-zinc-700">You does not have todo yet.</p>
	{/if}
</header>
