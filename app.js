async function generate() {
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
    
          

  } catch (error) {
    clearInterval(interval);
    output.innerText = "❌ Something went wrong. Please try again.";
  }
  
   }

