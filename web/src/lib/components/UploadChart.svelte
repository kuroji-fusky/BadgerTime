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
  let currentElement = $state<Element | null>();

  const handleBlockPosition = (e: MouseEvent) => {
    const { left, top } = containerRoot.getBoundingClientRect();
    const relX = e.x - left;
    const relY = e.y - top;

    const elementCursor = document.elementFromPoint(relX, relY);

    // This will effectively debounce from all the damn console.logs
    if (elementCursor === currentElement) return;
    currentElement = elementCursor;

    // Get only the attribute [data-day-block]
    // if (!currentElement?.attributes.getNamedItem("data-day-block")) return;
  };

  onMount(() => {
    const enterTrue = () => {
      isHovering = true;

      containerRoot.addEventListener("pointermove", handleBlockPosition);
    };
    const enterFalse = () => {
      isHovering = false;

      containerRoot.removeEventListener("pointermove", handleBlockPosition);
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
