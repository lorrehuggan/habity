import { invoke } from "@tauri-apps/api/core";
import type { Timeline } from "~/types/Timeline";

export const createTimeline = async () => {
	const response = (await invoke("create_timeline")) as Timeline;
	return response;
};
