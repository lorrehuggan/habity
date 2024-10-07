import type { JSX } from "solid-js";
import Header from "../header";

interface Props {
	children: JSX.Element;
}
export default function MainLayout(props: Props) {
	return (
		<div class="relative mx-auto w-11/12 pt-20">
			<Header />
			{props.children}
		</div>
	);
}
