import dayjs from "dayjs";
import { useSettingsStore } from "~/context/store";
import { getHabitThemeColor, isToday } from "~/lib/utils";
import type { Commit } from "~/types/Commits";

interface NodeProps {
	commit: Commit | undefined;
	date: string;
	habitID: string;
	color: string;
	newCommit: () => boolean;
}

export default function Node(props: NodeProps) {
	const settingsStore = useSettingsStore((state) => state);

	return (
		<div
			style={{
				"background-color":
					props.commit?.status === "completed" ||
					(props.newCommit() && dayjs().isSame(dayjs(props.date), "day"))
						? `hsla(${getHabitThemeColor(props.color)},2)`
						: `hsla(${getHabitThemeColor(props.color)},0.15)`,
				cursor: props.commit?.status === "completed" ? "pointer" : "default",
				border:
					settingsStore.settings.highlight_current_day &&
					isToday(props.date) &&
					!props.newCommit()
						? "1px solid white"
						: "none",
			}}
			data-date={props.date}
			class="size-3 rounded-[2px] opacity-30"
		/>
	);
}
