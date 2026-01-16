// const API_BASE = "PASTE_YOUR_WORKER_URL_HERE"; // e.g. https://choose-wisely-counter.<you>.workers.dev

// async function refreshCounts() {
//   try {
//     const res = await fetch(`${API_BASE}/counters`, { method: "GET" });
//     const data = await res.json();
//     const el = document.getElementById("counts");
//     if (el && typeof data?.red === "number" && typeof data?.blue === "number") {
//       el.textContent = `Red: ${data.red}  |  Blue: ${data.blue}`;
//     }
//   } catch (e) {
//     // If the worker isn't set up yet, ignore
//     console.debug("Counts not available yet.", e);
//   }
// }

// async function vote(color) {
//   // keep the message exactly as you wrote it
//   alert("choice succesfuly made");

//   try {
//     await fetch(`${API_BASE}/vote`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ color }),
//     });
//   } catch (e) {
//     console.error("Vote failed:", e);
//   }

//   // optional: update totals after voting
//   await refreshCounts();
// }

// document.getElementById("btn-red").addEventListener("click", () => vote("red"));
// document.getElementById("btn-blue").addEventListener("click", () => vote("blue"));

// refreshCounts();

// Cloudflare Worker base URL (your backend)
const API_BASE = "https://researchcbgchoices.idohersko.workers.dev";

// Show popup + send vote to backend
async function vote(color) {
  // keep the text exactly as you asked
  alert("choice succesfuly made");

  try {
    const res = await fetch(`${API_BASE}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("Vote failed:", res.status, txt);
    }
  } catch (err) {
    console.error("Network error while voting:", err);
  }
}

// Wait until the HTML is loaded, then attach click handlers
document.addEventListener("DOMContentLoaded", () => {
  const redBtn = document.getElementById("btn-red");
  const blueBtn = document.getElementById("btn-blue");

  if (!redBtn || !blueBtn) {
    console.error("Buttons not found. Make sure index.html has id='btn-red' and id='btn-blue'.");
    return;
  }

  redBtn.addEventListener("click", () => vote("red"));
  blueBtn.addEventListener("click", () => vote("blue"));
});

