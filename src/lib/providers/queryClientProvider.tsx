import type { JSX } from "solid-js";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const queryClient = new QueryClient();

export default function Provider(props: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			{/* TODO:  remove in production*/}
			<SolidQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
