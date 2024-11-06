import { updateSettings } from "~/actions/settings";
import MainLayout from "~/components/layouts/mainLayout";
import { SwitchControl, SwitchThumb, Switch } from "~/components/ui/switch";
import { useSettingsStore } from "~/context/store";
import { queryClient } from "~/lib/providers/queryClientProvider";

export default function Page() {
	const settingsStore = useSettingsStore((state) => state);

	function handleUpdateSettings(key: string, value: string | boolean) {
		settingsStore.setSettings({
			...settingsStore.settings,
			[key]: value,
		});
		updateSettings(settingsStore.settings);
		queryClient.refetchQueries({
			queryKey: ["get-settings"],
		});
	}

	return (
		<div class="w-screen">
			<MainLayout class="space-y-2">
				<div class="flex min-w-full items-center justify-between rounded border-[1px] border-foreground/20 p-2 transition-colors duration-200 ease-out hover:bg-foreground/5">
					<span class="text-sm">Week starts on Sunday</span>
					<Switch
						checked={settingsStore.settings.week_start_on_sunday}
						onChange={(e) => {
							handleUpdateSettings("week_start_on_sunday", e);
						}}
						class="flex items-center space-x-2"
					>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
				<div class="flex min-w-full items-center justify-between rounded border-[1px] border-foreground/20 p-2 transition-colors duration-200 ease-out hover:bg-foreground/5">
					<span class="text-sm">Show category filter</span>
					<Switch
						checked={settingsStore.settings.show_category_filter}
						onChange={(e) => {
							handleUpdateSettings("show_category_filter", e);
						}}
						class="flex items-center space-x-2"
					>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
				<div class="flex min-w-full items-center justify-between rounded border-[1px] border-foreground/20 p-2 transition-colors duration-200 ease-out hover:bg-foreground/5">
					<span class="text-sm">Highlight current day</span>
					<Switch
						checked={settingsStore.settings.highlight_current_day}
						onChange={(e) => {
							handleUpdateSettings("highlight_current_day", e);
						}}
						class="flex items-center space-x-2"
					>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
			</MainLayout>
		</div>
	);
}
