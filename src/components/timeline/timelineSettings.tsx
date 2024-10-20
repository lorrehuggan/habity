import { createMutation } from "@tanstack/solid-query";
import { Trash } from "lucide-solid";
import { type JSX, createSignal } from "solid-js";
import { archiveHabit } from "~/actions/habits";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { queryClient } from "~/lib/providers/queryClientProvider";
import { getHabitThemeColor } from "~/lib/utils";
import type { Habit } from "~/types/Habit";
import { Button } from "../ui/button";
import FocusedTimeline from "./focusedTimeline";

interface Props {
	children: JSX.Element;
	habit: Habit;
}

interface ComponentProps {
	habit: Habit;
}

function Info(props: ComponentProps) {
	return (
		<div class="flex h-7 items-center gap-2">
			<div
				style={{
					"background-color": `hsla(${getHabitThemeColor(props.habit.color)},0.7)`,
				}}
				class="flex-1 rounded p-2 text-xs"
			>
				<p>Completed</p>
			</div>
			<div
				style={{
					border: `1px solid hsla(${getHabitThemeColor(props.habit.color)},0.7)`,
				}}
				class="w-1/8 rounded p-2 text-xs"
			>
				<p class="text-center">{props.habit.streak}</p>
			</div>
			<div class="w-1/8 rounded p-2 text-xs">
				<p>0</p>
			</div>
		</div>
	);
}

function Actions(props: ComponentProps) {
	const archiveHabitMutation = createMutation(() => ({
		mutationKey: ["archive-habit"],
		mutationFn: archiveHabit,
	}));
	const [open, setOpen] = createSignal(false);

	function handleArchive() {
		archiveHabitMutation.mutateAsync(props.habit.id).then((response) => {
			if (response.message === "success") {
				queryClient.invalidateQueries({ queryKey: ["all-habits"] });
				setOpen(false);
			}
		});
	}

	return (
		<div class="flex w-full items-center gap-1">
			<Dialog open={open()} onOpenChange={setOpen}>
				<DialogTrigger>
					<Trash />
				</DialogTrigger>
				<DialogContent class="w-[85%] rounded p-4">
					<DialogHeader>Attention</DialogHeader>
					<DialogTitle>Do you really want to archive this habit?</DialogTitle>
					<div class="flex items-center justify-end gap-2">
						<Button onClick={() => setOpen(false)} variant="ghost">
							Cancel
						</Button>
						<Button onClick={handleArchive} variant="destructive">
							Archive
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default function TimelineSettings(props: Props) {
	return (
		<Dialog>
			<DialogTrigger class="w-full text-left outline-none">
				{props.children}
			</DialogTrigger>
			<DialogContent class="border-none px-[20px]">
				<FocusedTimeline habit={props.habit} />
				<Info habit={props.habit} />
				<Actions habit={props.habit} />
			</DialogContent>
		</Dialog>
	);
}
