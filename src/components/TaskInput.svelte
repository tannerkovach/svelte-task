<script>
    import { createEventDispatcher } from 'svelte';
    export let taskTitle;

    const dispatch = createEventDispatcher();

    function handleSubmit(value) {
        dispatch('handleSubmit', {
            value: value
        });
    }
</script>

<form id="taskForm" on:submit|preventDefault={handleSubmit(taskTitle.value)} class="grid grid-cols-[1fr_auto] w-full min-w-[375px] max-w-[500px] justify-self-center mb-8">
    <input id="taskTitle" type="text" placeholder="Add a new task" class="p-2 pl-4 rounded-md border-2 border-gray-300" bind:this={taskTitle} autofocus>
    <button type="submit" class="bg-sky-700 shadow-lg shadow-sky-700/50 p-2 rounded-full ml-2 text-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    </button>
</form>