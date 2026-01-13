<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  interface Period {
    startDate: string;
    endDate: string;
    flow: string;
  }

  let periods: Period[] = [];

  function loadPeriods(): void {
    const storedPeriods = JSON.parse(localStorage.getItem("periods")) || [];
    // Sort in reverse chronological order
    periods = storedPeriods.sort(
      (a: Period, b: Period) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }

  onMount(() => {
    loadPeriods();
    window.addEventListener("periodAdded", loadPeriods);
  });

  onDestroy(() => {
    window.removeEventListener("periodAdded", loadPeriods);
  });

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
  }

  function getFlowEmoji(flow: string): string {
    switch (flow) {
      case "light":
        return "🌸";
      case "moderate":
        return "🌺";
      case "heavy":
        return "🌹";
      default:
        return "❓";
    }
  }

  function deletePeriod(indexToDelete: number): void {
    if (confirm("Are you sure you want to delete this period?")) {
      const allPeriods = JSON.parse(localStorage.getItem("periods")) || [];
      // Find the actual index in the unsorted array
      const periodToDelete = periods[indexToDelete];
      const actualIndex = allPeriods.findIndex(
        (p: Period) =>
          p.startDate === periodToDelete.startDate &&
          p.endDate === periodToDelete.endDate
      );
      if (actualIndex !== -1) {
        allPeriods.splice(actualIndex, 1);
        localStorage.setItem("periods", JSON.stringify(allPeriods));
        loadPeriods();
      }
    }
  }
</script>

<section class="bg-white rounded-2xl p-8 shadow-soft">
  <h2 class="text-rose text-2xl mb-6 font-bold">
    📚 Period History
  </h2>

  {#if periods.length === 0}
    <div class="flex items-center justify-center py-12">
      <p class="font-sans text-gray-600 text-center text-lg">
        No periods logged yet. Start tracking by logging your first period!
      </p>
    </div>
  {:else}
    <div class="space-y-3">
      {#each periods as period, index (period.startDate)}
        <div
          class="bg-linear-to-r from-blush to-peach rounded-xl p-6 shadow-soft hover:shadow-lg transition"
        >
          <div class="flex justify-between items-start">
            <div class="grow">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-3xl">{getFlowEmoji(period.flow)}</span>
                <div>
                  <p class="font-serif text-gray-800 text-lg font-semibold">
                    {formatDate(period.startDate)} – {formatDate(
                      period.endDate
                    )}
                  </p>
                  <p class="font-sans text-sm text-gray-700">
                    {getDuration(period.startDate, period.endDate)} days · {period.flow}
                    flow
                  </p>
                </div>
              </div>
            </div>
            <button
              on:click={() => {
                deletePeriod(index);
              }}
              class="text-rose hover:text-lavender transition text-2xl"
              title="Delete period"
            >
              ✕
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>
