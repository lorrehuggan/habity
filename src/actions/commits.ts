import { invoke } from "@tauri-apps/api/core";
import type { Commit } from "~/types/Commits";
import type { TauriResponse } from "~/types/Tauri";

export async function createCommit(habit_id: string) {
	const response = await invoke<TauriResponse>("create_commit", {
		id: habit_id,
	});

	return response;
}

export async function deleteCommit(commit_id: string) {
	const response = await invoke<TauriResponse>("delete_commit", {
		id: commit_id,
	});

	return response;
}

export async function getCommits(habit_id: string) {
	const response = await invoke<Array<Commit>>("get_commits", {
		id: habit_id,
	});

	return response;
}
