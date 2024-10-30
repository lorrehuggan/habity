import type { JSX } from "solid-js";
import Header from "../header";
import { cx } from "class-variance-authority";

interface Props {
	children: JSX.Element;
	class?: string;
}
export default function MainLayout(props: Props) {
	return (
		<>
			<Header />
			<div class="mt-24 max-h-[calc(100vh-96px)] w-full overflow-y-scroll pb-8">
				<div class={cx("mx-auto w-11/12", props.class)}>{props.children}</div>
			</div>
		</>
	);
}
