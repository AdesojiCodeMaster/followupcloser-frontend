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



// 🔥 TEMPORARY MOBILE RESET (REMOVE AFTER CONFIRMING)
if (!localStorage.getItem("storageResetDone")) {
  localStorage.clear();
  localStorage.setItem("storageResetDone", "true");
}

async function generate() {
  const output = document.getElementById("output");
  const captureBox = document.getElementById("captureBox");

  const genCount = Number(localStorage.getItem("genCount") || 0);
  const unlocked = localStorage.getItem("unlocked") === "true";

  // 🔒 HARD GATE: allow only 1 free generation
  if (genCount >= 1 && !unlocked) {
    captureBox.style.display = "block";
    output.innerText =
      "🔒 Please save your contact to continue generating follow-ups.";
    return;
  }

  // ⏳ Loading
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

    // 📊 Increment generation count
    localStorage.setItem("genCount", genCount + 1);

    // 📩 After FIRST generation → show capture & unlock
    if (genCount === 0) {
      captureBox.style.display = "block";
      localStorage.setItem("unlocked", "true");
    }

  } catch (err) {
    clearInterval(interval);
    output.innerText = "❌ Something went wrong. Please try again.";
  }
}
