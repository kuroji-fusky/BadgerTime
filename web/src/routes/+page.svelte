<script lang="ts">
  import { Meta } from "$lib/components";
  import UploadChart from "$lib/components/UploadChart/UploadChart.svelte";
  import UploadHourDetails from "$lib/components/UploadChart/UploadHourDetails.svelte";
</script>

<Meta title="Main page" description="Hi" />
<div>
  <UploadChart />
  <UploadChart />

  <UploadHourDetails />
</div>
