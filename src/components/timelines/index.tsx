import { createQuery } from "@tanstack/solid-query";
import Timeline from "../timeline";
import getHabits from "~/actions/habits";
import { For, Match, Switch } from "solid-js";

export default function Timelines() {
	const query = createQuery(() => ({
		queryKey: ["all-habits"],
		queryFn: getHabits,
	}));

	return (
		<div class="space-y-4">
			<Switch>
				<Match when={query.isPending}>
					<div>Loading...</div>
				</Match>
				<Match when={query.isError}>
					<div>Error...</div>
				</Match>
				<Match when={query.isSuccess}>
					<For each={query.data}>{(habit) => <Timeline habit={habit} />}</For>
				</Match>
			</Switch>
		</div>
	);
}
