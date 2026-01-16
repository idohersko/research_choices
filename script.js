const API_BASE = "PASTE_YOUR_WORKER_URL_HERE"; // e.g. https://choose-wisely-counter.<you>.workers.dev

async function refreshCounts() {
  try {
    const res = await fetch(`${API_BASE}/counters`, { method: "GET" });
    const data = await res.json();
    const el = document.getElementById("counts");
    if (el && typeof data?.red === "number" && typeof data?.blue === "number") {
      el.textContent = `Red: ${data.red}  |  Blue: ${data.blue}`;
    }
  } catch (e) {
    // If the worker isn't set up yet, ignore
    console.debug("Counts not available yet.", e);
  }
}

async function vote(color) {
  // keep the message exactly as you wrote it
  alert("choice succesfuly made");

  try {
    await fetch(`${API_BASE}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });
  } catch (e) {
    console.error("Vote failed:", e);
  }

  // optional: update totals after voting
  await refreshCounts();
}

document.getElementById("btn-red").addEventListener("click", () => vote("red"));
document.getElementById("btn-blue").addEventListener("click", () => vote("blue"));

refreshCounts();
