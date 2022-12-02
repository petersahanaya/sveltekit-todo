<script lang="ts">
	import { todos } from '../stores/store';
	import { fade } from 'svelte/transition';

	export let id: number;
	export let handlePopUp: any;

	const todo = $todos.find((todo) => todo.id === id);
</script>

<svelte:head>
	<title>Svelte Todo's</title>
</svelte:head>
<div
	class="absolute top-0 right-0 w-screen h-screen bg-slate-800/10 flex justify-center items-center"
>
	<main class=" w-[80vw] h-[12rem] bg-white relative" transition:fade>
		<button
			on:click={handlePopUp}
			class="absolute top-[-30px] text-[1.2rem] cursor-pointer right-[10px]">X</button
		>
		<section class="flex justify-around items-center p-4">
			<h4 class="text-[1.2rem]">{todo?.title}</h4>
			<p class="text-stone-600 text-[.8rem]">{todo?.date}</p>
		</section>
		<p class="text-[.9rem] px-5">{todo?.description}</p>
	</main>
</div>
