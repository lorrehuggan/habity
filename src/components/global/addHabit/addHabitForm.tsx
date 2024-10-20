import { createForm } from "@tanstack/solid-form";
import { createMutation } from "@tanstack/solid-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { For } from "solid-js";
import { z } from "zod";
import { createHabit } from "~/actions/habits";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { queryClient } from "~/lib/providers/queryClientProvider";
import { getHabitThemeColor, habitThemes } from "~/lib/utils";
import type { Habit } from "~/types/Habit";
import type { HabitCategory } from "~/types/HabitCategory";
import { setOpenMenu } from "./addHabitMenu";

interface FormErrorProps {
	message: string;
}

function FormErrorMessage(props: FormErrorProps) {
	return <p class="text-destructive text-xs">{props.message}</p>;
}

const categories: HabitCategory[] = [
	"Day",
	"None",
	"Study",
	"Night",
	"Morning",
	"Other",
	"Health",
	"Fitness",
	"Productivity",
	"Social",
	"Finance",
	"Learning",
];

export default function AddHabitForm() {
	const mutation = createMutation(() => ({
		mutationKey: ["create-habit"],
		mutationFn: createHabit,
	}));

	const form = createForm(() => ({
		defaultValues: {
			name: "",
			description: "",
			color: "Blue",
			streak: "Daily",
			category: "None",
		},
		onSubmit: async (values) => {
			const habit = {
				...values.value,
				id: "",
				created: new Date().toISOString(),
				status: "Active",
			} as Habit;
			mutation.mutateAsync(habit).then((response) => {
				if (response.message === "success") {
					queryClient.invalidateQueries({ queryKey: ["all-habits"] });
					setOpenMenu(false);
					return;
				}
			});
		},
		validatorAdapter: zodValidator(),
	}));

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<div class="space-y-2">
				<div>
					<form.Field
						name="name"
						validators={{
							onChange: z
								.string()
								.min(2, "Name must be at least 2 characters long")
								.max(50, "Name must be at most 64 characters long"),
						}}
					>
						{(field) => (
							<>
								<Label for={field().name}>Name</Label>
								<TextField class="mt-1">
									<TextFieldInput
										name={field().name}
										type="text"
										value={field().state.value}
										onBlur={field().handleBlur}
										onChange={({
											target,
										}: { target: EventTarget & HTMLInputElement }) =>
											field().handleChange(target.value)
										}
									/>
								</TextField>
								<div class="mt-1 h-1">
									{field().state.meta.errors.length ? (
										<FormErrorMessage
											message={field().state.meta.errors.join(",").toString()}
										/>
									) : null}
								</div>
							</>
						)}
					</form.Field>
				</div>
				<div>
					<form.Field
						name="description"
						validators={{
							onChange: z
								.string()
								.min(2, "Description must be at least 2 characters long")
								.max(50, "Description must be at most 128 characters long"),
						}}
					>
						{(field) => (
							<>
								<Label for={field().name} class="mb-2">
									Description
								</Label>
								<TextField class="mt-1">
									<TextFieldInput
										name={field().name}
										type="text"
										value={field().state.value}
										onBlur={field().handleBlur}
										onChange={({
											target,
										}: { target: EventTarget & HTMLInputElement }) =>
											field().handleChange(target.value)
										}
									/>
								</TextField>
								<div class="mt-1 h-1">
									{field().state.meta.errors.length ? (
										<FormErrorMessage
											message={field().state.meta.errors.join(",").toString()}
										/>
									) : null}
								</div>
							</>
						)}
					</form.Field>
				</div>
				<div class="grid grid-cols-2 gap-2">
					<div>
						<form.Field name="streak">
							{(field) => (
								<>
									<Label for={field().name} class="mb-2">
										Streak
									</Label>
									<Select
										class="mt-1"
										name="streak"
										// defaultValue="Daily"
										value={field().state.value}
										onChange={(e) => {
											if (e) {
												return field().handleChange(e);
											}
										}}
										options={["Daily", "Weekly", "Monthly"]}
										placeholder="Select a streak"
										itemComponent={(props) => (
											<SelectItem item={props.item}>
												{props.item.rawValue}
											</SelectItem>
										)}
									>
										<SelectTrigger
											aria-label="Streak"
											class="w-full text-muted-foreground"
										>
											<SelectValue<string>>
												{(state) => state.selectedOption()}
											</SelectValue>
										</SelectTrigger>
										<SelectContent class="text-muted-foreground" />
									</Select>
									<div class="mt-1 h-1">
										{field().state.meta.errors.length ? (
											<FormErrorMessage
												message={field().state.meta.errors.join(",").toString()}
											/>
										) : null}
									</div>
								</>
							)}
						</form.Field>
					</div>
					<div>
						{/* <form.Field name="reminder"> */}
						{/* 	{(field) => ( */}
						{/* 		<> */}
						{/* 			<Label for={field().name}>Reminder</Label> */}
						{/* 			<Select */}
						{/* 				onChange={(e) => { */}
						{/* 					if (e) { */}
						{/* 						return field().handleChange(e); */}
						{/* 					} */}
						{/* 				}} */}
						{/* 				defaultValue="Day before" */}
						{/* 				options={["Day before", "Day of", "Day after"]} */}
						{/* 				placeholder="Select a reminder time" */}
						{/* 				itemComponent={(props) => ( */}
						{/* 					<SelectItem item={props.item}> */}
						{/* 						{props.item.rawValue} */}
						{/* 					</SelectItem> */}
						{/* 				)} */}
						{/* 			> */}
						{/* 				<SelectTrigger */}
						{/* 					aria-label="Reminder" */}
						{/* 					class="w-full text-muted-foreground" */}
						{/* 				> */}
						{/* 					<SelectValue<string>> */}
						{/* 						{(state) => state.selectedOption()} */}
						{/* 					</SelectValue> */}
						{/* 				</SelectTrigger> */}
						{/* 				<SelectContent class="text-muted-foreground" /> */}
						{/* 			</Select> */}
						{/* 		</> */}
						{/* 	)} */}
						{/* </form.Field> */}
					</div>
				</div>
				<div>
					<form.Field name="category">
						{(field) => (
							<>
								<Label for={field().name} class="mb-2">
									Category
								</Label>
								<Select
									class="mt-1"
									// defaultValue="Health"
									value={field().state.value}
									onChange={(e) => {
										if (e) {
											return field().handleChange(e);
										}
									}}
									options={categories.sort()}
									placeholder="Select a category"
									itemComponent={(props) => (
										<SelectItem item={props.item}>
											{props.item.rawValue}
										</SelectItem>
									)}
								>
									<SelectTrigger
										aria-label="Reminder"
										class="w-full text-muted-foreground"
									>
										<SelectValue<string>>
											{(state) => state.selectedOption()}
										</SelectValue>
									</SelectTrigger>
									<SelectContent class="text-muted-foreground" />
								</Select>
								<div class="mt-1 h-1">
									{field().state.meta.errors.length ? (
										<FormErrorMessage
											message={field().state.meta.errors.join(",").toString()}
										/>
									) : null}
								</div>
							</>
						)}
					</form.Field>
				</div>

				<div>
					<form.Field
						validators={{
							onSubmit: z.string().min(2, "Please select a color"),
						}}
						name="color"
					>
						{(field) => (
							<>
								<Label for={field().name} class="mb-2">
									Color
								</Label>
								<RadioGroup
									class="mx-auto mt-1 flex w-9/12 items-center justify-between"
									name={field().name}
									value={field().state.value}
									onChange={(e: string) => {
										field().handleChange(e);
									}}
								>
									<For each={habitThemes}>
										{(color) => (
											<div>
												<RadioGroupItem
													class="size-6 cursor-pointer rounded-full"
													style={{
														"background-color": `hsla(${getHabitThemeColor(color)},1)`,
														border:
															field().state.value === color
																? "2px solid white"
																: "none",
													}}
													value={color}
												/>
											</div>
										)}
									</For>
								</RadioGroup>
								<div class="mt-1 h-1">
									{field().state.meta.errors.length ? (
										<FormErrorMessage
											message={field().state.meta.errors.join(",").toString()}
										/>
									) : null}
								</div>
							</>
						)}
					</form.Field>
				</div>
				<div class="">
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							isSubmitting: state.isSubmitting,
						})}
						children={(state) => {
							return (
								<Button
									class="mt-4 w-full"
									type="submit"
									disabled={!state().canSubmit}
								>
									{state().isSubmitting ? "..." : "Create Habit"}
								</Button>
							);
						}}
					/>
				</div>
			</div>
		</form>
	);
}
