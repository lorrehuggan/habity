import { createQuery } from "@tanstack/solid-query";
import { Match } from "solid-js";
import { Switch } from "solid-js";
import { getArchivedHabits } from "~/actions/habits";
import { Button } from "../ui/button";
import { For } from "solid-js";
import { A } from "@solidjs/router";

export default function Archived() {
  const query = createQuery(() => ({
    queryKey: ["all-habits"],
    queryFn: getArchivedHabits,
  }));

  return (
    <div class="space-y-4">
      <Switch>
        <Match when={query.isPending}>
          <div>Loading...</div>
        </Match>
        <Match when={query.isError}>
          <div>Error...</div>
        </Match>
        <Match when={query.isSuccess}>
          <Switch>
            <Match when={!query.data?.length}>
              <div class="flex w-full flex-col items-center justify-center">
                <p class="mb-4">
                  You currently dont have any archived habits setup.
                </p>
              </div>
            </Match>
            <Match when={query.data}>
              <A href="/">home</A>
              <For each={query.data}>
                {(habit) => {
                  return <p>{habit.name}</p>;
                }}
              </For>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </div>
  );
}
