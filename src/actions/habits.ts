import { invoke } from "@tauri-apps/api/core";
import type { Habit } from "~/types/Habit";
import type { TauriResponse } from "~/types/Tauri";

export async function getHabits() {
	const response = await invoke<Array<Habit>>("get_habits");

	return response;
}

export async function createHabit(habit: Habit) {
	const response = await invoke<TauriResponse>("create_habit", { habit });

	return response;
}

export async function archiveHabit(id: string) {
	const response = await invoke<TauriResponse>("archive_habit", { id });

	return response;
}

export async function updateHabit(habit: Habit) {
	const response = await invoke<TauriResponse>("update_habit", { habit });

	return response;
}
