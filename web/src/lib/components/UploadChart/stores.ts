import { writable } from "svelte/store";

export const hasDayActive = writable(false);
export const channelUploadData = writable([]);

export const hourBlockPointer = writable({
  coords: [0, 0],
  data: [],
});