<script lang="ts">
  import { onMount } from "svelte";
  import AddNew from "./lib/AddNew.svelte";
  import Auth from "./lib/Auth.svelte";
  import ExpectedPeriod from "./lib/ExpectedPeriod.svelte";
  import Header from "./lib/Header.svelte";
  import History from "./lib/History.svelte";
  import LastPeriod from "./lib/LastPeriod.svelte";
  import TipOfDay from "./lib/TipOfDay.svelte";

  interface CurrentUser {
    name: string;
    email: string;
  }

  let isLoggedIn = false;
  let currentUser: CurrentUser = { name: "", email: "" };

  onMount(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      currentUser = JSON.parse(user);
      isLoggedIn = true;
    }
  });

  function handleLogin(userData: CurrentUser): void {
    currentUser = userData;
    isLoggedIn = true;
  }

  function handleLogout(): void {
    localStorage.removeItem("currentUser");
    isLoggedIn = false;
    currentUser = { name: "", email: "" };
  }
</script>

{#if isLoggedIn}
  <main class="min-h-screen bg-linear-to-br from-white via-blush to-lavender">
    <Header userName={currentUser.name} onLogout={handleLogout} />

    <!-- Main Content Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <LastPeriod />
        <ExpectedPeriod />
      </div>

      <!-- Form Section -->
      <div class="mb-8">
        <AddNew />
      </div>

      <!-- History Section -->
      <div>
        <History />
      </div>

      <!-- Wellness Tips Section (Full Width) -->
      <div class="mb-8">
        <TipOfDay />
      </div>
    </div>
  </main>
{:else}
  <Auth onLogin={handleLogin} />
{/if}

<style global>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: "Poppins", ui-sans-serif, system-ui;
  }

  :global(html, body, #app) {
    height: 100%;
  }
</style>
