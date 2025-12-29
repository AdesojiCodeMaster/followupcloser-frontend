async function generate() {
  const output = document.getElementById("output");
  const captureBox = document.getElementById("captureBox");

  const genCount = Number(localStorage.getItem("genCount") || 0);
  const unlocked = localStorage.getItem("generationUnlocked") === "true";

  // 🔒 BLOCK AFTER 3 GENERATIONS
  if (genCount >= 3 && !unlocked) {
    captureBox.style.display = "block"; // 👈 FIX IS HERE
    output.innerText =
      "🔒 You’ve reached the free limit. Please submit the form below to continue.";
    return;
  }

  // ⏳ Loading UX
  const loadingMessages = [
    "Understanding your situation…",
    "Thinking through the best follow-up for you…",
    "Crafting the right tone…",
    "Writing a natural follow-up…"
  ];

  let i = 0;
  output.innerText = loadingMessages[0];

  const interval = setInterval(() => {
    output.innerText = loadingMessages[i % loadingMessages.length];
    i++;
  }, 1200);

  try {
    const response = await fetch(
      "https://followupcloser-backend.onrender.com/api/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: lead.value,
          chat: chat.value,
          type: type.value,
          tone: tone.value
        })
      }
    );

    const data = await response.json();
    clearInterval(interval);

    // ✅ Show result
    output.innerText = data.result;

    // 📊 Increment generation count AFTER success
    localStorage.setItem("genCount", genCount + 1);

  } catch (err) {
    clearInterval(interval);
    output.innerText = "❌ Something went wrong. Please try again.";
  }
}
