<script lang="ts">
  interface User {
    email: string;
    password: string;
    name: string;
  }

  let isSignup = false;
  let email = "";
  let password = "";
  let confirmPassword = "";
  let name = "";
  let errorMessage = "";

  export let onLogin: (userData: { name: string; email: string }) => void;

  function handleSignup(): void {
    errorMessage = "";

    if (!email || !password || !confirmPassword || !name) {
      errorMessage = "All fields are required";
      return;
    }

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match";
      return;
    }

    if (password.length < 6) {
      errorMessage = "Password must be at least 6 characters";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (users.some((u: User) => u.email === email)) {
      errorMessage = "Email already registered";
      return;
    }

    // Add new user
    users.push({ email, password, name });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email, name }));

    onLogin({ name, email });
  }

  function handleSignin(): void {
    errorMessage = "";

    if (!email || !password) {
      errorMessage = "Email and password are required";
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (!user) {
      errorMessage = "Invalid email or password";
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: user.email, name: user.name })
    );
    onLogin({ name: user.name, email: user.email });
  }

  function handleSubmit(): void {
    if (isSignup) {
      handleSignup();
    } else {
      handleSignin();
    }
  }

  function toggleMode(): void {
    isSignup = !isSignup;
    errorMessage = "";
    email = "";
    password = "";
    confirmPassword = "";
    name = "";
  }
</script>

<main
  class="min-h-screen bg-linear-to-br from-lavender via-blush to-peach flex items-center justify-center p-4"
>
  <div class="w-full max-w-md">
    <div class="bg-white rounded-3xl shadow-soft p-8">
      <div class="text-center mb-8">
        <h1 class=" text-rose text-4xl font-bold mb-2">🌸 OpenPeriods</h1>
        <p class=" text-gray-600">Your cycle, your wellness</p>
      </div>

      <h2 class="font-serif text-gray-800 text-2xl font-bold mb-6 text-center">
        {isSignup ? "Create Account" : "Welcome Back"}
      </h2>

      {#if errorMessage}
        <div
          class="bg-rose bg-opacity-20 border border-rose text-gray-800 px-4 py-3 rounded-xl mb-6 font-sans text-sm"
        >
          {errorMessage}
        </div>
      {/if}

      <form on:submit|preventDefault={handleSubmit} class="space-y-5">
        {#if isSignup}
          <div>
            <label
              for="name"
              class="block text-sm font-semibold mb-2 text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              bind:value={name}
              placeholder="Your name"
              class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition"
            />
          </div>
        {/if}

        <div>
          <label
            for="email"
            class="block text-sm font-semibold mb-2 text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            bind:value={email}
            placeholder="you@example.com"
            class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-semibold mb-2 text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            bind:value={password}
            placeholder="Enter password"
            class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition"
          />
        </div>

        {#if isSignup}
          <div>
            <label
              for="confirm-password"
              class="block text-sm font-semibold mb-2 text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              bind:value={confirmPassword}
              placeholder="Confirm password"
              class="w-full px-4 py-3 rounded-xl border-2 border-rose bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-rose transition"
            />
          </div>
        {/if}

        <button
          type="submit"
          class="w-full bg-rose text-white px-6 py-3 rounded-full shadow-soft hover:bg-rose hover:opacity-90 transition cursor-pointer font-semibold text-lg"
        >
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="font-sans text-gray-600 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            on:click={toggleMode}
            class="text-rose font-semibold hover:underline cursor-pointer"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>

    <p class="text-center text-gray-600 text-xs mt-6 font-sans">
      Your data is stored securely in your browser
    </p>
  </div>
</main>
