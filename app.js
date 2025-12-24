
async function generate() {
  const lead = document.getElementById("lead").value;
  const chat = document.getElementById("chat").value;
  const type = document.getElementById("type").value;
  const tone = document.getElementById("tone").value;

  const output = document.getElementById("output");

  // Show loading state
  output.innerText = "⏳ Generating follow-up message...";

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

    // Show AI result
    output.innerText = data.result;

  } catch (error) {
    output.innerText = "❌ Something went wrong. Please try again.";
  }
}

