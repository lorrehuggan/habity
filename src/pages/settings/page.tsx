import { A } from "@solidjs/router";
import MainLayout from "~/components/layouts/mainLayout";

export default function Page() {
	return (
		<MainLayout>
			<A href="/">Home</A>
			<h1>Settings</h1>
			<A href="/archived">Archived</A>
		</MainLayout>
	);
}
