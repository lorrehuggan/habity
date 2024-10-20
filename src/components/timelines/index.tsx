import { createQuery } from "@tanstack/solid-query";
import Timeline from "../timeline";
import { getHabits } from "~/actions/habits";
import { For, Match, Switch } from "solid-js";
import { Button } from "../ui/button";
import { Plus } from "lucide-solid";
import { setOpenMenu } from "../global/addHabit/addHabitMenu";

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
					<Switch>
						<Match when={!query.data?.length}>
							<div class="flex w-full flex-col items-center justify-center">
								<p class="mb-4">You currently dont have any habits setup.</p>
								<Button onClick={() => setOpenMenu(true)}>
									<Plus class="mr-2" /> Add Habit
								</Button>
							</div>
						</Match>
						<Match when={query.data}>
							<For each={query.data}>
								{(habit) => {
									return <Timeline habit={habit} />;
								}}
							</For>
						</Match>
					</Switch>
				</Match>
			</Switch>
		</div>
	);
}
