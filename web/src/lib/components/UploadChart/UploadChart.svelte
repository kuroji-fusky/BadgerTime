<script lang="ts">
  import { onMount } from "svelte";

  import { cn } from "$lib/utils";

  import { WEEKS } from "./UploadConst";
  import UploadRow from "./UploadRow.svelte";
  import { hourBlockPointer } from "./stores";

  export interface Props {
    condensed?: true;
    flexible?: true;
  }

  const { condensed, flexible }: Props = $props();

  ////////////////////////////////////////////////

  let containerRoot: HTMLDivElement;

  // We'll keep track state for the tooltip
  let isInsideContainer = $state(false);
  let currentHourBlock = $state<Element | null>(null);

  const handleBlockHover = (e: MouseEvent) => {
    const t = e.target as HTMLElement;

    if (!t.attributes.getNamedItem("data-hour-block")) return;

    if (currentHourBlock === t) return;
    currentHourBlock = t;

    const tRekt = t.getBoundingClientRect();

    hourBlockPointer.update(() => ({
      coords: [tRekt.top + 24, tRekt.left],
      data: [],
    }));

    console.log(tRekt);
  };

  onMount(() => {
    // Can't use AbortController on these since the user will phase in and out of its container boundaries
    const enterTrue = () => {
      isInsideContainer = true;
      containerRoot.addEventListener("pointermove", handleBlockHover);
    };
    const enterFalse = () => {
      isInsideContainer = false;
      containerRoot.removeEventListener("pointermove", handleBlockHover);
    };

    const containerController = new AbortController();
    const { signal: containerSignal } = containerController;

    containerRoot.addEventListener("focus", enterTrue, {
      signal: containerSignal,
    });
    containerRoot.addEventListener("pointerenter", enterTrue, {
      signal: containerSignal,
    });

    containerRoot.addEventListener("blur", enterFalse, {
      signal: containerSignal,
    });
    containerRoot.addEventListener("pointerleave", enterFalse, {
      signal: containerSignal,
    });

    return () => {
      containerController.abort();
    };
  });
</script>

<div
  data-is-focused={isInsideContainer ? "" : undefined}
  id="upload-chart-container"
  bind:this={containerRoot}
  class={cn("relative flex gap-x-2", !flexible ? "w-max" : "")}
>
  <UploadRow labelOnly {condensed} />
  {#each WEEKS as day}
    <UploadRow {day} {condensed} />
  {/each}
</div>
