import type { JSX } from "solid-js";
import Header from "../header";

interface Props {
	children: JSX.Element;
}
export default function MainLayout(props: Props) {
	return (
		<>
			<Header />
			<div class="mt-24 max-h-[calc(100vh-96px)] w-full overflow-y-scroll pb-8">
				<div class="mx-auto w-11/12">{props.children}</div>
			</div>
		</>
	);
}
