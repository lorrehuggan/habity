import { For, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { createTimeline } from "~/actions/timeline";
import { Check } from "lucide-solid";
import { Button } from "~/components/ui/button";
import type { Habit } from "~/types/Habit";

interface Props {
	habit: Habit;
}

export default function Timeline(props: Props) {
	const [timeline, setTimeline] = createStore<Array<string[]>>([]);

	onMount(() => {
		createTimeline().then((tl) =>
			setTimeline([
				tl.days.Sun,
				tl.days.Mon,
				tl.days.Tue,
				tl.days.Wed,
				tl.days.Thu,
				tl.days.Fri,
				tl.days.Sat,
			]),
		);
	});

	return (
		<div class="w-full rounded border-[1px] border-black/20 p-2">
			<div class="mb-2 flex items-center justify-between">
				<div>
					<p class="font-bold text-sm">{props.habit.name}</p>
					<p class="line-clamp-1 text-muted-foreground text-xs">
						{props.habit.description}
					</p>
				</div>
				<Button class="size-8 p-0" type="button">
					<Check class="text-white" size={18} />
				</Button>
			</div>
			<div class="space-y-1">
				<For each={timeline}>
					{(day) => (
						<div class="mx-auto flex flex-nowrap justify-between">
							<For each={day}>
								{(node) => {
									return (
										<div
											data-date={node}
											class="size-3 rounded-[2px] bg-emerald-400 opacity-30"
										/>
									);
								}}
							</For>
						</div>
					)}
				</For>
			</div>
		</div>
	);
}
