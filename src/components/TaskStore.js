import { writable } from "svelte/store";
export const tasks = writable([]);
export const completedTasks = writable([
    {
        id: 123423, title: "Task 1", completed: true 
    }
]);