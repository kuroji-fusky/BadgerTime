<script lang="ts">
  import Portal from "../Portal.svelte";
  import { Tween } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  import { hourBlockPointer } from "./stores";

  const _pos = new Tween([0, 0], {
    duration: 300,
    easing: cubicOut,
  });

  $: _pos.target = $hourBlockPointer.coords;
</script>

<Portal location="body">
  <div
    class="pointer-events-none absolute p-2 rounded-md border bg-white shadow"
    style="top: {_pos.current[0]}px; left:{_pos.current[1]}px"
  >
    content
  </div>
</Portal>
