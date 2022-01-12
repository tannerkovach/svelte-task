<script>
    import { fade, fly, slide } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { v4 as uuidv4 } from 'uuid';

    let tasks = [],
        completedTasks = [],
        taskTitle,
        checked = false;

    function handleSubmit() {
        let taskForm = document.querySelector('#taskForm');
        let taskTitle = document.querySelector('#taskTitle').value;
        let task = {
            id: uuidv4(),
            title: taskTitle,
            completed: false
        };
        taskTitle.length > 0 ? tasks.push(task) : alert('Please enter a task');
        console.log(tasks);
        taskForm.reset();
        tasks = tasks
    }

    function deleteTask(id, i) {
        let task = tasks.find(task => task.id === id);
        if (task) {
            tasks = [...tasks.slice(0, i), ...tasks.slice(i + 1)];
        }
        else {
            completedTasks = [...completedTasks.slice(0, i), ...completedTasks.slice(i + 1)];
        }
    }

    function editTask(e, id, i) {
        console.log(`id = ` + id);
        console.log(e);
        let task = tasks.find(task => task.id === id);
        task.title = e.target.value;
        tasks = tasks;
    }

    function completeTask(id) {
        let task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        task.completed ? completedTasks.push(task) : tasks.push(task);
        //remove task from tasks array if completed
        tasks = tasks.filter(task => task.id !== id);
        console.log(completedTasks)
        completedTasks = completedTasks;
        tasks = tasks;
    }
    function incompleteTask(id) {
        let task = completedTasks.find(task => task.id === id);
        task.completed ? tasks.push(task) : completedTasks.push(task);
        completedTasks = completedTasks.filter(task => task.id !== id);
        task.completed = !task.completed;
        completedTasks = completedTasks;
        tasks = tasks;
    }
</script>

<div class="container mx-auto my-10">
    <div class="mb-8">
        <h1 class="text-4xl text-gray-800 mb-4 font-sans">Welcome to SvelteKit</h1>
        <p class="text-gray-500 font-mono">Visit <a class="border-b-4 border-sky-700" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    </div>

    <form id="taskForm" on:submit|preventDefault={handleSubmit} class="grid grid-cols-[1fr_auto] max-w-[500px] mb-8">
        <input id="taskTitle" type="text" placeholder="Add a new task" class="p-2 pl-4 rounded-md border-2 border-gray-300" bind:this={taskTitle} >
        <button type="submit" class="bg-sky-700 shadow-lg shadow-sky-700/50 p-2 rounded-full ml-2 text-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        </button>
    </form>

    <div id="taskList" class="grid grid-cols-2 gap-4">
        <div class="mb-10">
            <h3 in:fade out:fade class="text-3xl font-mono mb-4">Tasks</h3>
            {#each tasks as task, i (task.id)}
                <div animate:flip in:fade out:fade class="flex bg-gray-100 rounded-md p-2 pl-4 text-gray-700 mb-2 flex items-center">
                    <input on:click="{() => completeTask(task.id)}" type="checkbox" class="min-w-[1.5rem] h-6 w-6 mr-2 rounded-full appearance-none bg-gray-50 border-2 border-gray-300 checked:border-0 checked:bg-cyan-400">

                    <input on:input="{(e) => editTask(e, task.id, i)}" value="{task.title}" class="bg-gray-100 w-full p-2 focus:outline-none">

                    <button on:click="{() => deleteTask(task.id, i)}" class="text-gray-700 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>  
            {/each}
        </div>
        <div class="mb-10">
            <h3 in:fade out:fade class="text-3xl font-mono mb-4">Completed</h3>
            {#each completedTasks as task, i (task.id)}
                <div animate:flip in:fade out:fade class="flex bg-gray-100 rounded-md p-2 pl-4 text-gray-700 mb-2 flex items-center">
                    <input on:click="{() => incompleteTask(task.id)}" type="checkbox" class="min-w-[1.5rem] h-6 w-6 mr-2 rounded-full appearance-none bg-gray-50 border-2 border-gray-300 checked:border-0 checked:bg-cyan-400" checked>

                    <input on:input="{(e) => editTask(e, task.id, i)}" value="{task.title}" class="bg-gray-100 w-full p-2 line-through focus:outline-none">
    
                    <button on:click="{() => deleteTask(task.id, i)}" class="text-gray-700 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>  
            {/each}
        </div>
    </div>
</div>
