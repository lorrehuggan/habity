import { invoke } from "@tauri-apps/api/core";
import type { Timeline } from "~/types/Timeline";

export async function createTimeline() {
	const response = (await invoke("create_timeline")) as Timeline;
	return response;
}

export const initTimeline = createTimeline().then((tl) => {
	const day = tl.days;
	if (
		!day.Sun ||
		!day.Mon ||
		!day.Tue ||
		!day.Wed ||
		!day.Thu ||
		!day.Fri ||
		!day.Sat
	) {
		return [];
	}
	return [
		day.Sun.reverse(),
		day.Mon.reverse(),
		day.Tue.reverse(),
		day.Wed.reverse(),
		day.Thu.reverse(),
		day.Fri.reverse(),
		day.Sat.reverse(),
	];
});
