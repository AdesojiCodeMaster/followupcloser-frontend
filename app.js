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
    document.getElementById("captureBox").style.display = "block";
    

  } catch (error) {
    clearInterval(interval);
    output.innerText = "❌ Something went wrong. Please try again.";
  }
}




//validation function 
function isValidContact(value) {
  const emailRegex = /\S+@\S+\.\S+/;
  const phoneRegex = /^\+?\d{10,15}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
    }



//Submit function 
async function submitContact() {
  const contactInput = document.getElementById("contact");
  const message = document.getElementById("captureMsg");
  const value = contactInput.value.trim();

  if (!isValidContact(value)) {
    message.innerText = "Please enter a valid email or WhatsApp number.";
    return;
  }

  const formData = new FormData();

  // 🔑 MUST MATCH TALLY FIELD ID
  formData.append("contact", value);

  try {
    fetch("https://tally.so/r/ODlRzY", {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    message.innerText = "Saved! We’ll send you useful follow-up tips.";
    contactInput.value = "";

  } catch (err) {
    message.innerText = "Could not save. Please try again.";
  }
      }
      
