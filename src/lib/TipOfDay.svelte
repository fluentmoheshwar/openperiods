<script lang="ts">
  interface Tip {
    text: string;
    icon: string;
    category:
      | "hydration"
      | "exercise"
      | "nutrition"
      | "rest"
      | "mood"
      | "products";
  }

  const tips: Tip[] = [
    {
      text: "Stay hydrated! Drink at least 8-10 glasses of water daily to help with cramps and energy levels.",
      icon: "💧",
      category: "hydration",
    },
    {
      text: "Light exercise like yoga or walking can help reduce period pain and boost your mood.",
      icon: "🧘",
      category: "exercise",
    },
    {
      text: "Eat iron-rich foods like spinach, beans, and lean meats to replenish what your body loses.",
      icon: "🥬",
      category: "nutrition",
    },
    {
      text: "Get 7-9 hours of quality sleep to support your hormonal balance and overall wellness.",
      icon: "😴",
      category: "rest",
    },
    {
      text: "Track your mood changes throughout your cycle to better understand your emotional patterns.",
      icon: "🧠",
      category: "mood",
    },
    {
      text: "Magnesium-rich foods like dark chocolate and almonds can help ease muscle tension.",
      icon: "🍫",
      category: "nutrition",
    },
    {
      text: "Try deep breathing exercises or meditation to manage stress and anxiety.",
      icon: "🌬️",
      category: "mood",
    },
    {
      text: "Avoid excessive caffeine and salt, which can worsen bloating and mood swings.",
      icon: "☕",
      category: "nutrition",
    },
    {
      text: "Warm baths or heating pads can provide relief from menstrual cramps.",
      icon: "🛁",
      category: "rest",
    },
    {
      text: "Swimming or gentle stretching can improve circulation and reduce discomfort.",
      icon: "🏊",
      category: "exercise",
    },
    {
      text: "Keep a mood journal to identify patterns in your emotional well-being during your cycle.",
      icon: "📔",
      category: "mood",
    },
    {
      text: "Coconut water is excellent for rehydration due to its natural electrolytes.",
      icon: "🥥",
      category: "hydration",
    },
    {
      text: "Menstrual pads are the most common choice—choose between regular, overnight, or panty liners based on flow.",
      icon: "🩹",
      category: "products",
    },
    {
      text: "Menstrual cups are reusable, eco-friendly, and can hold more fluid than pads or tampons.",
      icon: "🔴",
      category: "products",
    },
    {
      text: "Tampons are convenient and discreet. Insert at a 45° angle toward your back for comfort.",
      icon: "⚪",
      category: "products",
    },
    {
      text: "Period panties are specially designed to absorb menstrual fluid—great as backup or standalone.",
      icon: "👖",
      category: "products",
    },
    {
      text: "Disc-shaped menstrual products sit at the cervix and offer comfort without expansion.",
      icon: "💫",
      category: "products",
    },
    {
      text: "Always change pads every 4-8 hours and tampons every 4-6 hours to prevent odor and infections.",
      icon: "⏰",
      category: "products",
    },
  ];

  function getCategoryColor(category: string): string {
    switch (category) {
      case "hydration":
        return "bg-mint";
      case "exercise":
        return "bg-peach";
      case "nutrition":
        return "bg-blush";
      case "rest":
        return "bg-lavender";
      case "mood":
        return "bg-rose";
      case "products":
        return "bg-[#ffc0cb]";
      default:
        return "bg-gray-200";
    }
  }

  function getCategoryLabel(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
</script>

<section
  class="bg-linear-to-br from-lavender to-mint rounded-2xl p-8 shadow-soft mt-5"
>
  <h2 class="text-rose text-2xl mb-6 font-bold">💚 Wellness Tips</h2>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2"
  >
    {#each tips as tip (tip.text)}
      <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div class="flex gap-3">
          <div class="text-3xl shrink-0">{tip.icon}</div>
          <div>
            <p class="font-sans text-sm text-gray-800 leading-relaxed mb-3">
              {tip.text}
            </p>
            <span
              class="{getCategoryColor(
                tip.category
              )} text-gray-800 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {getCategoryLabel(tip.category)}
            </span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
