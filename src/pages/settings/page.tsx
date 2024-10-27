import { A } from "@solidjs/router";
import MainLayout from "~/components/layouts/mainLayout";

export default function Page() {
	return (
		<MainLayout>
			<h1 class="text-center">Settings</h1>
			<A href="/archived">Archived</A>
		</MainLayout>
	);
}
