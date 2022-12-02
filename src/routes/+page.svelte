<script lang="ts">
	import { todos } from '../stores/store';
	import { onMount } from 'svelte';
	import PopUp from '../components/PopUp.svelte';
	import { fade, fly } from 'svelte/transition';

	let title = '';
	let description = '';
	let popUp = false;
	let id: number;

	const handlePost = () => {
		if (title && description) {
			const data = {
				id: $todos.length,
				title,
				description,
				date: `${new Date(Date()).getHours()} : ${new Date(Date()).getMinutes()}`
			};
			todos.update((n) => [...n, data]);
			localStorage.setItem('todo', JSON.stringify($todos));
			title = '';
			description = '';
		}
	};

	const handlePopUp = (ids: number) => {
		if (!popUp) {
			id = ids;
			popUp = true;
		} else {
			id = ids;
			popUp = false;
		}
	};

	const handleRemove = (id: number) => {
		todos.update((prev) => {
			return prev.filter((s) => s.id !== id);
		});
		localStorage.setItem('todo', JSON.stringify($todos));
	};

	onMount(() => {
		if (!localStorage.getItem('todo')) {
			return localStorage.setItem('todo', JSON.stringify([]));
		}

		return todos.set(JSON.parse(localStorage.getItem('todo')!));
	});
</script>

<main class="w-screen mt-[2rem] h-screen bg-slate-100 flex items-center place-center flex-col">
	<section class="flex mb-8 items-center space-center flex-col gap-[.8rem]">
		<input
			class="p-3 w-[20rem] placeholder:text-[.8rem] rounded-xl text-black bg-white"
			type="text"
			bind:value={title}
			placeholder="e.g Goes to school..."
		/>
		<textarea
			class="p-3 w-[20rem] placeholder:text-[.8rem] rounded-xl text-black bg-white"
			type="text"
			bind:value={description}
			placeholder="e.g Math task to multiply n + n"
		/>
		<button
			class="bg-sky-500 p-3 transition-[200ms] text-white rounded-xl w-56 text-sm hover:bg-sky-600"
			on:click={handlePost}>+ Add</button
		>
	</section>

	{#if !$todos.length}
		<p class="text-stone-600 text-[.9rem]">There's no todo yet..</p>
	{/if}

	{#if $todos.length}
		<nav>
			{#if popUp}
				<PopUp {id} {handlePopUp} />
			{/if}
			{#each $todos as todo (todo.id)}
				<section
					on:click={() => handlePopUp(todo.id)}
					on:dblclick={() => handleRemove(todo.id)}
					class="w-[80vw] overflow-hidden  cursor-pointer h-[7rem] p-3 transition-[200ms] mt-4 bg-white rounded-sm hover:bg-slate-50"
					in:fly={{ y: 30, duration: 300 }}
					out:fade
				>
					<h4 class="text-[1.1rem] text-stone-900" transition:fade>{todo.title}</h4>
					<p class="text-[.9rem] mt-2 text-stone-700  whitespace-nowrap truncate">
						{todo.description}
					</p>
					<p class="text-[.8rem] mt-3 text-stone-600">{todo.date}</p>
				</section>
			{/each}
		</nav>
	{/if}
</main>
