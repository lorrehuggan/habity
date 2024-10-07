import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { For } from "solid-js";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import {
	RadioGroup,
	RadioGroupItem,
	RadioGroupItemLabel,
} from "~/components/ui/radio-group";
import { TextField, TextFieldInput } from "~/components/ui/text-field";

const colors = [
	"blue",
	"cyan",
	"green",
	"yellow",
	"orange",
	"red",
	"magenta",
	"grey",
];

export default function AddHabitForm() {
	const form = createForm(() => ({
		defaultValues: {
			name: "",
			description: "",
			color: "",
			progress: 0,
			completion_count: 0,
		},
		onSubmit: async (values) => {
			console.log(values);
			form.reset();
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
							<TextField>
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
							{field().state.meta.errors.length ? (
								<em>{field().state.meta.errors.join(",")}</em>
							) : null}
						</>
					)}
				</form.Field>
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
							<Label for={field().name}>Description</Label>
							<TextField>
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
							{field().state.meta.errors.length ? (
								<em>{field().state.meta.errors.join(",")}</em>
							) : null}
						</>
					)}
				</form.Field>
				<form.Field
					validators={{
						onChange: z.string({
							message: "Please select a valid color",
						}),
					}}
					name="color"
				>
					{(field) => (
						<>
							<Label for={field().name}>Color</Label>
							<RadioGroup
								name={field().name}
								defaultValue="blue"
								value={field().state.value}
								onChange={(e: string) => {
									field().handleChange(e);
								}}
							>
								<For each={colors}>
									{(color) => (
										<RadioGroupItem value={color}>
											<RadioGroupItemLabel>{color}</RadioGroupItemLabel>
										</RadioGroupItem>
									)}
								</For>
							</RadioGroup>
							{field().state.meta.errors.length ? (
								<em>{field().state.meta.errors.join(",")}</em>
							) : null}
						</>
					)}
				</form.Field>
				<form.Subscribe
					selector={(state) => ({
						canSubmit: state.canSubmit,
						isSubmitting: state.isSubmitting,
					})}
					children={(state) => {
						return (
							<button type="submit" disabled={!state().canSubmit}>
								{state().isSubmitting ? "..." : "Submit"}
							</button>
						);
					}}
				/>
			</div>
		</form>
	);
}
