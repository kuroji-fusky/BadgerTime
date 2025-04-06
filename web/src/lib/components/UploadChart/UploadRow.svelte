<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Props as RootProps } from "./UploadChart.svelte";

  interface Props extends RootProps {
    day?: string;
    labelOnly?: true;
  }

  const { day, condensed, labelOnly }: Props = $props();

  // For proto only
  const hourPopulate = [...Array(6)];

  // biome-ignore lint/style/noNonNullAssertion: no type safety on terniary operators
  const miniDay = !labelOnly ? [...day!].slice(0, 3).join("") : "";

  // This is to make the hour block unique while still being technically the same element visually
  // as it causes some issues when comparing the element and its data contained from it
  const randHash = crypto.randomUUID();
</script>

<div
  data-row={miniDay ? miniDay.toLowerCase() : undefined}
  id="upload-day-row"
  class="w-[3.25rem]"
>
  <!-- heading -->
  {#if !labelOnly}
    <span class="text-xs opacity-70 mb-2 h-6 flex items-end cursor-default">
      {miniDay}
    </span>
  {/if}
  <!-- blocks -->
  <div
    class={cn(
      "grid gap-y-1 w-full",
      !labelOnly ? "" : "mt-8",
      !condensed ? "*:h-3.5 lg:*:h-4" : "*:h-3.5",
    )}
  >
    {#each hourPopulate as _, idx}
      {#if !labelOnly}
        <div
          data-hour-block={miniDay.toLowerCase()}
          data-block-index={`${idx}-${randHash}`}
          class="w-full border border-neutral-500/30 rounded-sm"
        ></div>
      {:else}
        <div class="text-xs text-right cursor-default">
          {idx}
        </div>
      {/if}
    {/each}
  </div>
</div>
