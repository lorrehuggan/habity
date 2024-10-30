import { invoke } from "@tauri-apps/api/core";
import type { Settings } from "~/types/Settings";

export async function getSettings() {
	const response = await invoke<Settings>("get_settings");
	return response;
}

export async function updateSettings(settings: Settings) {
	await invoke("update_settings", settings);
}
