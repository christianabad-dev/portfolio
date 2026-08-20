// ============ Terminal typing sequence ============
const terminalLines = [
  { text: "$ whoami", pause: 400 },
  { text: "christian-lloyd-abad", pause: 500 },
  { text: "", pause: 200 },
  { text: "$ run-checks --tracks=dev,qa,data", pause: 500 },
  { text: "[PASS] Developer ....... full-stack (Electron / Java / SQL / C#)", pause: 350, cls: "line-pass" },
  { text: "[PASS] QA Tester ....... functional, usability & system testing", pause: 350, cls: "line-bug" },
  { text: "[PASS] Data Science .... foundations (Azure, analytics, ML pipelines)", pause: 350, cls: "line-data" },
  { text: "", pause: 200 },
  { text: "BUILD SUCCESSFUL — 3 tracks verified", pause: 0, cls: "line-final" },
];

const output = document.getElementById("terminalOutput");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderPlain() {
  output.innerHTML = "";
  terminalLines.forEach(l => {
    const span = document.createElement("span");
    if (l.cls) span.className = l.cls;
    span.textContent = l.text;
    output.appendChild(span);
    output.appendChild(document.createTextNode("\n"));
  });
}

async function typeLine(line) {
  const span = document.createElement("span");
  if (line.cls) span.className = line.cls;
  output.appendChild(span);

  const raw = line.text;
  for (let i = 0; i < raw.length; i++) {
    span.textContent += raw[i];
    await sleep(10);
  }
  output.appendChild(document.createTextNode("\n"));
  await sleep(line.pause);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTerminal() {
  if (prefersReducedMotion) {
    renderPlain();
    return;
  }
  for (const line of terminalLines) {
    await typeLine(line);
  }
}

runTerminal();

// ============ Tabs ============
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const track = tab.dataset.track;

    tabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });

    panels.forEach(p => {
      const active = p.dataset.track === track;
      p.classList.toggle("is-active", active);
      p.hidden = !active;
    });
  });
});

// ============ Mobile nav ============
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navList.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
