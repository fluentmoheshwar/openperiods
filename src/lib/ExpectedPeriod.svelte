<script lang="ts">
  import { onMount } from "svelte";

  interface Period {
    startDate: string;
    endDate: string;
    flow: string;
  }

  let expectedStart: string = "";
  let expectedEnd: string = "";
  let avgCycleLength: number = 28;

  onMount(() => {
    const periods = JSON.parse(localStorage.getItem("periods")) || [];
    if (periods.length >= 2) {
      // Calculate average cycle length
      let cycleLengths: number[] = [];
      for (let i = 1; i < periods.length; i++) {
        const prev = new Date(periods[i - 1].startDate);
        const curr = new Date(periods[i].startDate);
        const diff = Math.ceil(
          (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
        );
        cycleLengths.push(diff);
      }
      avgCycleLength = Math.round(
        cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length
      );
    }

    // Calculate expected next period
    if (periods.length > 0) {
      const lastPeriod: Period = periods[periods.length - 1];
      const lastStart = new Date(lastPeriod.startDate);
      const nextStart = new Date(lastStart);
      nextStart.setDate(nextStart.getDate() + avgCycleLength);

      const nextEnd = new Date(nextStart);
      const lastDuration =
        Math.ceil(
          (new Date(lastPeriod.endDate).getTime() - lastStart.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      nextEnd.setDate(nextEnd.getDate() + lastDuration - 1);

      expectedStart = nextStart.toISOString().split("T")[0];
      expectedEnd = nextEnd.toISOString().split("T")[0];
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

  function daysUntil(dateStr: string): number {
    if (!dateStr) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil(
      (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }
</script>

<section class="bg-peach rounded-2xl p-8 shadow-soft h-full flex flex-col">
  <h2 class="text-rose text-2xl mb-6 font-bold">
    🔮 Expected Period
  </h2>
  {#if expectedStart}
    <div class="space-y-4 grow">
      <div class="bg-white rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">Expected Start</p>
        <p class="font-serif text-lg text-gray-800">
          {formatDate(expectedStart)}
        </p>
      </div>
      <div class="bg-white rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">Expected End</p>
        <p class="font-serif text-lg text-gray-800">
          {formatDate(expectedEnd)}
        </p>
      </div>
      <div class="bg-white rounded-xl p-4">
        <p class="font-sans text-sm text-gray-600">Average Cycle Length</p>
        <p class="font-serif text-lg text-gray-800">{avgCycleLength} days</p>
      </div>
      <div class="bg-rose text-white rounded-xl p-4">
        <p class="font-sans text-sm">Days until expected period</p>
        <p class="font-serif text-2xl font-bold">{daysUntil(expectedStart)}</p>
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-center grow">
      <p class="font-sans text-gray-600 text-center">
        Log at least 2 periods to see predictions!
      </p>
    </div>
  {/if}
</section>
