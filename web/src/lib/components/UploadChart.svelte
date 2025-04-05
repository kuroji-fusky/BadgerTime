<script lang="ts">
  import { onMount } from "svelte";
  import UploadRow from "./UploadRow.svelte";

  export interface Props {
    condensed?: true;
  }

  const { condensed }: Props = $props();

  const WEEKS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let containerRoot: HTMLDivElement;

  // We'll keep track state for the modal
  let isHovering = $state(false);
  let currentHourBlock = $state<Element | null>(null);

  const handleBlockHover = (e: MouseEvent) => {
    const t = e.target as HTMLElement;

    if (!t.attributes.getNamedItem("data-hour-block")) return;
    if (currentHourBlock === t) return;
    currentHourBlock = t;

    const tRekt = t.getBoundingClientRect();
    console.log(tRekt);
  };

  onMount(() => {
    // Can't use AbortController on these since the user will phase in and out of its container boundaries
    const enterTrue = () => {
      isHovering = true;
      containerRoot.addEventListener("pointermove", handleBlockHover);
    };
    const enterFalse = () => {
      isHovering = false;
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
  data-has-entered={isHovering}
  id="upload-chart-container"
  bind:this={containerRoot}
  class="relative flex gap-x-2 w-max"
>
  <UploadRow labelOnly {condensed} />
  {#each WEEKS as day}
    <UploadRow {day} {condensed} />
  {/each}
</div>
