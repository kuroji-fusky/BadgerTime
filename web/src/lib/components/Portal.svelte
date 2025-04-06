<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount, type Snippet } from "svelte";

  const moveDom = (node: Element, inject: string) => {
    const target = document.querySelector(inject);
    target?.appendChild(node);
  };

  interface Props {
    location: string;
    children: Snippet;
  }

  onMount(() => {
    if (import.meta.env.DEV) {
      if (!window.customElements.get("portal-detached")) {
        // svelte-ignore perf_avoid_nested_class
        class DudPortalElement extends HTMLDivElement {}

        window.customElements.define("portal-detached", DudPortalElement, {
          extends: "div",
        });
      } else {
        console.warn("Custom element 'portal-detached' is already defined.");
      }
    }
  });

  const { location, children }: Props = $props();
</script>

<portal-detached use:moveDom={location} style="display: contents;">
  {@render children()}
</portal-detached>
