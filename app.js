/*async function generate() {
  const lead = document.getElementById("lead").value;
  const chat = document.getElementById("chat").value;
  const type = document.getElementById("type").value;
  const tone = document.getElementById("tone").value;

  const output = document.getElementById("output");

  const loadingMessages = [
    "Understanding your situation…",
    "Thinking through the best follow-up for you…",
    "Crafting the right tone…",
    "Writing a natural follow-up…"
  ];

  let i = 0;

  // ✅ SHOW IMMEDIATE FEEDBACK
  output.innerText = loadingMessages[0];

  // ✅ START ROTATING LOADING TEXT
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
        body: JSON.stringify({ lead, chat, type, tone })
      }
    );

    const data = await response.json();

    // ✅ STOP LOADING
    clearInterval(interval);

    // ✅ SHOW RESULT
output.innerText = data.result;

    
    // ✅ SHOW contact capture AFTER first generation
if (!window.captureShown) {
  document.getElementById("captureBox").style.display = "block";
  window.captureShown = true;
    }
    
    

  } catch (error) {
    clearInterval(interval);
    output.innerText = "❌ Something went wrong. Please try again.";
  }
} */

async function generate() {
  const lead = document.getElementById("lead").value;
  const chat = document.getElementById("chat").value;
  const type = document.getElementById("type").value;
  const tone = document.getElementById("tone").value;

  const output = document.getElementById("output");
  const captureBox = document.getElementById("captureBox");

  // -----------------------------
  // 🔐 GENERATION GATE
  // -----------------------------
  const genCount = Number(localStorage.getItem("genCount") || 0);
  const unlocked = localStorage.getItem("contactUnlocked") === "true";

  // Allow only ONE free generation
  if (genCount >= 1 && !unlocked) {
    captureBox.style.display = "block";
    output.innerText =
      "🔒 Please save your contact to continue generating follow-ups.";
    return;
  }

  // -----------------------------
  // ⏳ LOADING UX
  // -----------------------------
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
        body: JSON.stringify({ lead, chat, type, tone })
      }
    );

    const data = await response.json();
    clearInterval(interval);

    // ✅ SHOW RESULT
    output.innerText = data.result;

    // 📊 TRACK GENERATION COUNT
    localStorage.setItem("genCount", genCount + 1);

    // 📩 SHOW CAPTURE AFTER FIRST GENERATION (ONCE)
    if (genCount === 0 && !unlocked) {
      captureBox.style.display = "block";
      localStorage.setItem("contactUnlocked", "true"); // unlock immediately
    }

  } catch (error) {
    clearInterval(interval);
    output.innerText = "❌ Something went wrong. Please try again.";
  }
      }
      
