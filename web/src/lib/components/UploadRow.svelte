<script lang="ts">
  import type { Props as RootProps } from "./UploadChart.svelte";

  interface Props extends RootProps {
    day?: string;
    labelOnly?: true;
  }

  const { day, condensed, labelOnly }: Props = $props();

  const hourPopulate = [...Array(!condensed ? 24 : 8)];

  // biome-ignore lint/style/noNonNullAssertion: no type safety on terniary operators
  const miniDay = !labelOnly ? [...day!].slice(0, 3).join("") : "";
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
  <div class={`grid *:h-3.5 gap-y-1 w-full ${!labelOnly ? "" : "mt-8"}`}>
    {#each hourPopulate as _, idx}
      {#if !labelOnly}
        <div
          data-hour-block={miniDay.toLowerCase()}
          data-block-index={idx}
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
