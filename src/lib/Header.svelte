<script lang="ts">
  export let userName: string = "there";
  export let onLogout: () => void;

  // Get greeting based on time of day
  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }
</script>

<header
  class="bg-linear-to-r from-lavender to-peach p-8 m-5 shadow-soft rounded-3xl"
>
  <nav class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-rose text-3xl font-bold">OpenPeriods</h1>
      <p class="font-sans text-gray-700">Your cycle, your wellness</p>
    </div>
    <button
      on:click={onLogout}
      class="bg-rose text-white px-6 py-2 rounded-full shadow-soft hover:bg-rose hover:opacity-90 transition cursor-pointer font-semibold text-sm"
    >
      Logout
    </button>
  </nav>
  <h2 class="font-serif text-4xl text-gray-800">
    {getGreeting()}, {userName}! 🌸
  </h2>
</header>
