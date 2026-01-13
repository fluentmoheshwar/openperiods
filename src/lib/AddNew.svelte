<script lang="ts">
  import { onMount } from "svelte";

  let startDate: string = "";
  let endDate: string = "";
  let flow: string = "light";
  let showSuccess: boolean = false;
  let successMessage: string = "";

  onMount(() => {
    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    startDate = today;
  });

  function handleSubmit(): void {
    if (!startDate || !endDate) {
      alert("Please fill in both start and end dates.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after start date.");
      return;
    }

    const newPeriod = { startDate, endDate, flow };
    const periods = JSON.parse(localStorage.getItem("periods")) || [];
    periods.push(newPeriod);
    localStorage.setItem("periods", JSON.stringify(periods));

    successMessage = "✨ Period logged successfully!";
    showSuccess = true;

    // Reset form
    startDate = new Date().toISOString().split("T")[0];
    endDate = "";
    flow = "light";

    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess = false;
    }, 3000);

    // Trigger page reload for other components to update
    window.dispatchEvent(new Event("periodAdded"));
  }
</script>

<section class="bg-blush rounded-2xl p-8 shadow-soft">
  <h2 class="font-sans text-rose text-2xl mb-6 font-bold">
    📝 Log New Period
  </h2>

  {#if showSuccess}
    <div
      class="bg-mint border border-green-400 text-gray-800 px-4 py-3 rounded-xl mb-6 font-sans"
    >
      {successMessage}
    </div>
  {/if}

  <form
    on:submit|preventDefault={handleSubmit}
    class="space-y-5 font-sans text-gray-800"
  >
    <div>
      <label
        for="start-date"
        class="block text-sm font-semibold mb-2 text-gray-700"
      >
        Start Date
      </label>
      <input
        type="date"
        id="start-date"
        bind:value={startDate}
        required
        class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition"
      />
    </div>

    <div>
      <label
        for="end-date"
        class="block text-sm font-semibold mb-2 text-gray-700"
      >
        End Date
      </label>
      <input
        type="date"
        id="end-date"
        bind:value={endDate}
        required
        class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition"
      />
    </div>

    <div>
      <label for="flow" class="block text-sm font-semibold mb-2 text-gray-700"
        >Flow Intensity</label
      >
      <select
        id="flow"
        bind:value={flow}
        class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition cursor-pointer"
      >
        <option value="light">🌸 Light</option>
        <option value="moderate">🌺 Moderate</option>
        <option value="heavy">🌹 Heavy</option>
      </select>
    </div>

    <button
      type="submit"
      class="w-full bg-rose text-white px-6 py-3 rounded-full shadow-soft hover:bg-lavender hover:text-rose transition cursor-pointer font-semibold text-lg"
    >
      Save Period
    </button>
  </form>
</section>
