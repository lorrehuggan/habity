import { A } from "@solidjs/router";
import { cx } from "class-variance-authority";
import {
	Archive,
	ArrowRight,
	Database,
	Paintbrush,
	Settings,
	SprayCan,
} from "lucide-solid";
import type { JSX } from "solid-js";
import MainLayout from "~/components/layouts/mainLayout";

interface LinkProps {
	link: string;
	color: string;
	icon: JSX.Element;
	name: string;
}

function Link(props: LinkProps) {
	return (
		<div class="flex min-w-full rounded border-[1px] border-foreground/20 p-2">
			<A
				class="flex w-full items-center justify-between text-sm"
				href={`/settings/${props.link}`}
			>
				<div class="flex items-center gap-2">
					<div class={cx("rounded p-1", props.color)}>{props.icon}</div>
					<span>{props.name}</span>
				</div>
				<ArrowRight size={16} />
			</A>
		</div>
	);
}

export default function Page() {
	return (
		<MainLayout>
			<h1 class="mb-4 text-center">Settings</h1>
			<ul class="space-y-2">
				<Link
					link="/general"
					color="bg-pink-500"
					icon={<Settings size={16} />}
					name="General"
				/>
				<Link
					link="/theme"
					color="bg-amber-500"
					icon={<SprayCan size={16} />}
					name="Theme"
				/>
				<Link
					link="/archived"
					color="bg-cyan-500"
					icon={<Archive size={16} />}
					name="Archived Habits"
				/>
				<Link
					link="/import-export"
					color="bg-emerald-500"
					icon={<Database size={16} />}
					name="Data Import/Export"
				/>
			</ul>
		</MainLayout>
	);
}
