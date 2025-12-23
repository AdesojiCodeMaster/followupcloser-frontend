async function generate() {
  const lead = document.getElementById("lead").value;
  const chat = document.getElementById("chat").value;
  const type = document.getElementById("type").value;
  const tone = document.getElementById("tone").value;

  const response = await fetch(
    "https://followupcloser-backend.onrender.com/api/generate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead, chat, type, tone })
    }
  );

  const data = await response.json();
  document.getElementById("output").innerText = data.result;
}
