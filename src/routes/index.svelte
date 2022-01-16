<script>
	import { fade, fly, slide} from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import TaskList from '../components/TaskList.svelte';
	import CompletedTaskList from '../components/CompletedTaskList.svelte';
	import TaskInput from '../components/TaskInput.svelte';

	let tasks = [];
	let completedTasks = [];
	let taskEntered;
   

	function handleSubmit() {
		let taskForm = document.querySelector('#taskForm');
		let taskTitle = document.querySelector('#taskTitle').value;
       
		let task = {
			id: uuidv4(),
			title: taskTitle,
			completed: false
		};
		taskTitle.length ? (taskEntered = true) : (taskEntered = false);
		taskTitle.length > 0 ? (tasks = [...tasks, task]) : alert('Please enter a task');
		taskForm.reset();
	}

	function deleteTask(clickEvent) {
		let task = tasks.find((task) => task.id === clickEvent.detail.task);
        let taskInput = document.querySelector('#taskTitle');
		if (task) {
			tasks = [...tasks.slice(0, clickEvent.detail.i), ...tasks.slice(clickEvent.detail.i + 1)];
		} else {
			completedTasks = [
				...completedTasks.slice(0, clickEvent.detail.i),
				...completedTasks.slice(clickEvent.detail.i + 1)
			];
		}
        if (!tasks.length && !completedTasks.length) {
            setTimeout(() => {
                taskEntered = false;
                taskInput.focus();
            }, 500);
        }      
	}

	function markComplete(clickEvent) {
		let task = tasks.find((task) => task.id == clickEvent.detail.task);
		completedTasks.push(task);
		tasks = tasks.filter((task) => task.id !== clickEvent.detail.task);
		task.completed = !task.completed;
		completedTasks = completedTasks;
	}

	function markIncomplete(clickEvent) {
		let task = completedTasks.find((task) => task.id == clickEvent.detail.task);
		tasks.push(task);
		completedTasks = completedTasks.filter((task) => task.id !== clickEvent.detail.task);
		task.completed = !task.completed;
		tasks = tasks;
	}
</script>

<div in:slide out:slide class="container p-4 h-full grid items-center mx-auto my-10" class:taskEntered>
	<TaskInput on:handleSubmit={handleSubmit} />

	{#if tasks.length !== 0 || completedTasks.length !== 0}
		<div transition:fade id="taskList" class="grid grid-cols-1 sm:grid-cols-2 gap-10">
			<TaskList bind:tasks on:markComplete={markComplete} on:deleteTask={deleteTask} />

			{#if completedTasks.length !== 0}
				<CompletedTaskList
					bind:completedTasks
					on:markIncomplete={markIncomplete}
					on:deleteTask={deleteTask}
				/>
			{/if}
		</div>
	{/if}
</div>
