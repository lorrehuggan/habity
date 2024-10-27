import { createMutation, createQuery } from "@tanstack/solid-query";
import { type JSX, Match } from "solid-js";
import { Switch } from "solid-js";
import { deleteHabit, getArchivedHabits, restoreHabit } from "~/actions/habits";
import { Button } from "../ui/button";
import { For } from "solid-js";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import type { Habit } from "~/types/Habit";
import { queryClient } from "~/lib/providers/queryClientProvider";

interface DeleteHabitDialogProps {
	habit: Habit;
	children: JSX.Element;
}

function DeleteHabitDialog(props: DeleteHabitDialogProps) {
	const deleteHabitMutation = createMutation(() => ({
		mutationKey: [`delete-habit-${props.habit.id}`],
		mutationFn: () => deleteHabit(props.habit.id),
	}));

	async function handleDelete() {
		const response = await deleteHabitMutation.mutateAsync();
		if (response.message === "success") {
			queryClient.invalidateQueries({ queryKey: ["all-archived-habits"] });
		}
	}

	return (
		<Dialog>
			<DialogTrigger>{props.children}</DialogTrigger>
			{/* <DialogTitle>Delete Habit</DialogTitle> */}
			<DialogContent class="w-[90%]">
				<p>Are you sure you want to delete this habit?</p>
				<p>This action cannot be reversed</p>
				<div class="flex justify-end gap-2">
					<Button onClick={handleDelete} variant="destructive">
						Delete
					</Button>
					<Button variant="secondary">Cancel</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default function Archived() {
	const query = createQuery(() => ({
		queryKey: ["all-archived-habits"],
		queryFn: getArchivedHabits,
	}));

	const restoreHabitMutation = createMutation(() => ({
		mutationKey: ["restore-habit"],
		mutationFn: (id: string) => restoreHabit(id),
	}));

	async function handleRestore(id: string) {
		const response = await restoreHabitMutation.mutateAsync(id);
		if (response.message === "success") {
			queryClient.invalidateQueries({ queryKey: ["all-archived-habits"] });
			queryClient.invalidateQueries({ queryKey: ["all-habits"] });
		}
	}

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
								<p class="mb-4">
									You currently dont have any archived habits setup.
								</p>
							</div>
						</Match>
						<Match when={query.data}>
							<For each={query.data}>
								{(habit) => {
									return (
										<div class="flex w-full items-center justify-between rounded-lg border-[1px] border-foreground/10 bg-muted/20 p-4">
											<p class="text-sm">{habit.name}</p>
											<div class="flex items-center gap-2">
												<Button
													onClick={() => {
														handleRestore(habit.id);
													}}
												>
													Restore
												</Button>
												<DeleteHabitDialog habit={habit}>
													<Button variant="destructive">Delete</Button>
												</DeleteHabitDialog>
											</div>
										</div>
									);
								}}
							</For>
						</Match>
					</Switch>
				</Match>
			</Switch>
		</div>
	);
}
