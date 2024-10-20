import { createMutation, createQuery } from "@tanstack/solid-query";
import dayjs from "dayjs";
import { Check, Crown } from "lucide-solid";
import {
	For,
	Match,
	Switch,
	createEffect,
	createSignal,
	onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { createCommit, deleteCommit, getCommits } from "~/actions/commits";
import { initTimeline } from "~/actions/timeline";
import { Button } from "~/components/ui/button";
import { queryClient } from "~/lib/providers/queryClientProvider";
import { getHabitThemeColor } from "~/lib/utils";
import type { Commit } from "~/types/Commits";
import type { Habit } from "~/types/Habit";
import TimelineSettings from "./timelineSettings";

interface Props {
	habit: Habit;
}

interface NodeProps {
	commit: Commit | undefined;
	date: string;
	habitID: string;
	color: string;
	newCommit: () => boolean;
}

function Node(props: NodeProps) {
	return (
		<div
			style={{
				"background-color":
					props.commit?.status === "completed" ||
					(props.newCommit() && dayjs().isSame(dayjs(props.date), "day"))
						? `hsla(${getHabitThemeColor(props.color)},1)`
						: `hsla(${getHabitThemeColor(props.color)},0.25)`,
				cursor: props.commit?.status === "completed" ? "pointer" : "default",
			}}
			data-date={props.date}
			class="size-3 rounded-[2px] opacity-30"
		/>
	);
}

export default function Timeline(props: Props) {
	const [timeline, setTimeline] = createStore<Array<string[]>>([]);
	const [commits, setCommits] = createSignal<Commit[]>([]);
	const [newCommit, setNewCommit] = createSignal(false);

	const query = createQuery(() => ({
		queryKey: [`commit-${props.habit.id}`],
		queryFn: () => getCommits(props.habit.id),
		retry: false,
	}));

	const createCommitMutation = createMutation(() => ({
		mutationKey: [`create-commit-${props.habit.id}`],
		mutationFn: () => createCommit(props.habit.id),
		retry: false,
	}));

	const deleteCommitMutation = createMutation(() => ({
		mutationKey: [`delete-commit-${props.habit.id}`],
		mutationFn: (commitID: string) => deleteCommit(commitID),
		retry: false,
	}));

	createEffect(() => {
		if (query.data) {
			setCommits(query.data);
			setNewCommit(
				query.data.some((commit) =>
					dayjs(commit.created).isSame(dayjs(), "day"),
				),
			);
		}
	});

	onMount(async () => {
		setTimeline(await initTimeline);
	});

	function handleCommit() {
		if (!newCommit()) {
			console.log("Creating commit");
			createCommitMutation.mutateAsync().then((response) => {
				console.log("Created commit");
				if (response.message === "success") {
					setNewCommit(true);
					queryClient.invalidateQueries({
						queryKey: [`commit-${props.habit.id}`],
					});
				}
			});
			return;
		}

		if (newCommit()) {
			console.log("Commit already exists");

			const commitID = commits().find((commit) =>
				dayjs(commit.created).isSame(dayjs(), "day"),
			)?.id;

			if (!commitID) {
				console.log("No commit ID found");
				return;
			}

			deleteCommitMutation.mutateAsync(commitID).then((response) => {
				console.log("Deleting commit");
				if (response.message === "success") {
					console.log("Deleted commit");
					setNewCommit(false);
					queryClient.invalidateQueries({
						queryKey: [`commit-${props.habit.id}`],
					});
				}
			});
		}
	}

	return (
		<div class="w-full rounded border-[1px] border-foreground/20 bg-background p-2">
			<div class="mb-2 flex items-center justify-between">
				<TimelineSettings habit={props.habit}>
					<div class="flex-1">
						<p class="font-bold text-sm">{props.habit.name}</p>
						<p class="line-clamp-1 text-muted-foreground text-xs">
							{props.habit.description}
						</p>
					</div>
				</TimelineSettings>
				<Switch>
					<Match when={newCommit()}>
						<Button onClick={handleCommit} class="size-7 p-0" type="button">
							<Crown size={18} />
						</Button>
					</Match>
					<Match when={!newCommit()}>
						<Button onClick={handleCommit} class="size-7 p-0" type="button">
							<Check class="" size={18} />
						</Button>
					</Match>
				</Switch>
			</div>
			<div class="space-y-1">
				<For each={timeline}>
					{(day) => (
						<div class="mx-auto flex flex-nowrap justify-between">
							<For each={day}>
								{(date) => {
									const thisDatesCommit = commits().find(
										(commit) => commit.created === date,
									);
									return (
										<Switch>
											<Match when={commits().length}>
												<Node
													newCommit={newCommit}
													habitID={props.habit.id}
													date={date}
													commit={thisDatesCommit}
													color={props.habit.color}
												/>
											</Match>
											<Match when={commits().length === 0}>
												<Node
													newCommit={newCommit}
													habitID={props.habit.id}
													date={date}
													commit={undefined}
													color={props.habit.color}
												/>
											</Match>
										</Switch>
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
