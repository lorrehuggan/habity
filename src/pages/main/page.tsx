import { createQuery } from "@tanstack/solid-query";
import { onMount } from "solid-js";
import { getSettings } from "~/actions/settings";
import MainLayout from "~/components/layouts/mainLayout";
import Timelines from "~/components/timelines";
import { useSettingsStore } from "~/context/store";

export default function Page() {
	const settingsStore = useSettingsStore((state) => state);
	const query = createQuery(() => ({
		queryKey: ["get-settings"],
		queryFn: getSettings,
	}));

	onMount(() => {
		query.data && settingsStore.setSettings(query.data);
	});

	return (
		<div class="w-screen">
			<MainLayout>
				<Timelines />
			</MainLayout>
		</div>
	);
}
