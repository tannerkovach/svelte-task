<script>
    import { fade, fly, slide } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { v4 as uuidv4 } from 'uuid';
    import { tasks, completedTasks } from './TaskStore.js';


    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    // function markIncomplete(task) {
    //     dispatch('markIncomplete', {
    //         task: task
    //     });
    // }

    function deleteTask(task, i) {
        dispatch('deleteTask', {
            task: task,
            i: i
        });
    }

    function markIncomplete(clickEvent) {
		let task = $completedTasks.find((task) => task.id == clickEvent);
		// tasks.push(task);
	
        tasks.update((tasks) => {
            
            return [...tasks, task]
            
        });
        completedTasks.update((tasks) => {
            
            return [...tasks, task]
            
        });
        
        console.log($tasks)
        $completedTasks = $completedTasks.filter((task) => task.id !== clickEvent);

		task.completed = !task.completed;
		$tasks = $tasks;
	}
</script>


<ul class="mb-10">
    <h3 in:fade out:fade class="text-3xl font-mono mb-4">Completed</h3>
    {#each $completedTasks as task, i (task.id)}
        <li animate:flip in:fade out:fade class="flex bg-gray-100 rounded-md p-2 pl-4 text-gray-700 mb-2 flex items-center">
            <input on:click="{markIncomplete(task.id)}" type="checkbox" class="min-w-[1.5rem] h-6 w-6 mr-2 rounded-full appearance-none bg-gray-50 border-2 border-gray-300 checked:border-0 checked:bg-cyan-400" checked>

            <input on:input="{(e) => editTask(e, task.id, i)}" value="{task.title}" class="bg-gray-100 w-full p-2 line-through focus:outline-none">

            <button on:click="{deleteTask(task.id, i)}" class="text-gray-700 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </li>  
    {/each}
</ul>