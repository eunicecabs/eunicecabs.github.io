const aboutJson =
`{
  "role": "Computer Science Student",
  "track": "Data Science",
  "focus": ["Web Development", "Databases", "Tech Support"],
  "location": "Laguna, Philippines",
  "availability": "Freelance + OJT, 9PM\u20135AM PHT"
}`;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function typeTerminal() {
  const el = document.getElementById("terminalBody");
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sequence = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "Eunice Loren Cabalo" },
    { type: "cmd", text: "cat about.json" },
    { type: "out", text: aboutJson },
    { type: "cmd", text: "", cursor: true },
  ];

  if (reduce) {
    el.innerHTML = sequence
      .map((s) =>
        s.type === "cmd"
          ? `<div><span class="prompt">eunice@laguna</span> ~ $ ${s.text}${s.cursor ? '<span class="cursor"></span>' : ""}</div>`
          : `<div class="val">${s.text}</div>`
      )
      .join("");
    return;
  }

  for (const step of sequence) {
    const line = document.createElement("div");
    el.appendChild(line);

    if (step.type === "cmd") {
      const prefix = document.createElement("span");
      prefix.innerHTML = `<span class="prompt">eunice@laguna</span> ~ $ `;
      line.appendChild(prefix);
      const textNode = document.createElement("span");
      line.appendChild(textNode);
      for (const ch of step.text) {
        textNode.textContent += ch;
        await sleep(22);
      }
      if (step.cursor) {
        const cur = document.createElement("span");
        cur.className = "cursor";
        line.appendChild(cur);
      }
    } else {
      line.className = "val";
      line.textContent = step.text;
      await sleep(120);
    }
    await sleep(180);
  }
}

function setupCopyEmail() {
  const btn = document.getElementById("copyEmailBtn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = original), 1600);
    } catch (e) {
      window.prompt("Copy my email:", email);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  typeTerminal();
  setupCopyEmail();
});
