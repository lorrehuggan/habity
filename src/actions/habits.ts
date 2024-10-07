import { invoke } from "@tauri-apps/api/core";
import type { Habit } from "~/types/Habit";

export default async function getHabits() {
	const response = await invoke<Array<Habit>>("get_habits");

	return response;
}
