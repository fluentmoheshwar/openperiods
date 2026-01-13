<script lang="ts">
  import { onMount } from "svelte";

  interface Period {
    startDate: string;
    endDate: string;
    flow: string;
  }

  let lastPeriod: Period | null = null;
  let duration: number = 0;

  onMount(() => {
    const periods = JSON.parse(localStorage.getItem("periods")) || [];
    if (periods.length > 0) {
      lastPeriod = periods[periods.length - 1];
      const start = new Date(lastPeriod.startDate);
      const end = new Date(lastPeriod.endDate);
      duration =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;
    }
  });

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getFlowColor(flow: string): string {
    switch (flow) {
      case "light":
        return "text-green-500";
      case "moderate":
        return "text-yellow-500";
      case "heavy":
        return "text-rose-500";
      default:
        return "text-gray-600";
    }
  }
</script>

<section class="bg-lavender rounded-2xl p-8 shadow-soft h-full flex flex-col">
  <h2 class="text-rose text-2xl mb-6 font-bold">
    📍 Last Period Details
  </h2>
  {#if lastPeriod}
    <div class="space-y-4 grow">
      <div class="bg-white rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">Start Date</p>
        <p class="font-serif text-lg text-gray-800">
          {formatDate(lastPeriod.startDate)}
        </p>
      </div>
      <div class="bg-white rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">End Date</p>
        <p class="font-serif text-lg text-gray-800">
          {formatDate(lastPeriod.endDate)}
        </p>
      </div>
      <div class="bg-white rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">Flow</p>
        <p
          class="font-serif text-lg {getFlowColor(lastPeriod.flow)} capitalize"
        >
          {lastPeriod.flow}
        </p>
      </div>
      <div class="bg-mint rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">Duration</p>
        <p class="font-serif text-lg text-gray-800">{duration} days</p>
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-center grow">
      <p class="font-sans text-gray-600 text-center">
        No period data yet. Log your first period to get started!
      </p>
    </div>
  {/if}
</section>
