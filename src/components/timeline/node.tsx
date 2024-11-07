import dayjs from "dayjs";
import { createMemo } from "solid-js";
import { useSettingsStore } from "~/context/store";
import { getHabitThemeColor, isToday } from "~/lib/utils";
import type { Commit } from "~/types/Commits";

interface NodeProps {
	commits: Commit[] | undefined;
	date: string;
	habitID: string;
	color: string;
	newCommit: () => boolean;
}

export default function Node(props: NodeProps) {
	const settingsStore = useSettingsStore((state) => state);

	const commits = createMemo(() => {
		return props.commits?.find((commit) =>
			dayjs(commit.created).isSame(dayjs(props.date), "day"),
		);
	});

	return (
		<div
			style={{
				"background-color":
					commits()?.status === "completed" ||
					(props.newCommit() && dayjs().isSame(dayjs(props.date), "day"))
						? `hsla(${getHabitThemeColor(props.color)},1)`
						: `hsla(${getHabitThemeColor(props.color)},0.05)`,
				cursor: commits()?.status === "completed" ? "pointer" : "default",
				transition: "background-color 1s",
				border:
					settingsStore.settings.highlight_current_day &&
					isToday(props.date) &&
					!props.newCommit()
						? "1px solid white"
						: "none",
			}}
			data-date={props.date}
			class="size-3 rounded-[4px]"
		/>
	);
}
