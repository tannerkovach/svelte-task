import { writable } from "svelte/store";
export const tasks = writable([]);
export const completedTasks = writable([]);