const menu = document.querySelector(".mobile-menu");
const nav = document.getElementById("navegacion");
const compact = window.matchMedia("(max-width: 45.99rem)");

function setMenu(open) {
  menu.hidden = !compact.matches;
  menu.setAttribute("aria-expanded", String(open));
  nav.hidden = compact.matches && !open;
}

if (menu && nav) {
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
  compact.addEventListener("change", () => setMenu(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menu.focus();
    }
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && compact.matches) setMenu(false);
  });
  setMenu(false);
}

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const servicePanels = Array.from(document.querySelectorAll("[data-service-panel]"));
function selectService(id) {
  tabs.forEach((tab) => {
    const selected = tab.getAttribute("aria-controls") === id;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  servicePanels.forEach((panel) => {
    panel.hidden = panel.id !== id;
  });
}

if (tabs.length) {
  document.querySelector(".service-tabs").hidden = false;
  tabs.forEach((tab, index) => {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    tab.addEventListener("click", () => selectService(panel.id));
    tab.addEventListener("keydown", (event) => {
      const keys = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (!Object.hasOwn(keys, event.key)) return;
      event.preventDefault();
      const target = tabs[keys[event.key]];
      selectService(target.getAttribute("aria-controls"));
      target.focus();
    });
  });
  selectService(servicePanels[0].id);
  document.querySelectorAll("[data-open-service]").forEach((link) => {
    link.addEventListener("click", () => {
      selectService(link.dataset.openService);
      document.getElementById(link.dataset.openService).focus({ preventScroll: true });
    });
  });
  // Deep links also open the matching service after a reload or history navigation.
  const openHash = () => {
    const panel = servicePanels.find((item) => "#" + item.id === location.hash);
    if (panel) selectService(panel.id);
  };
  window.addEventListener("hashchange", openHash);
  openHash();
}

const branchButtons = Array.from(document.querySelectorAll(".branch-selector"));
if (branchButtons.length) {
  const branches = Array.from(document.querySelectorAll("[data-branch-panel]"));
  const selectBranch = (id) => {
    branchButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.getAttribute("aria-controls") === id)));
    branches.forEach((branch) => { branch.hidden = branch.id !== id; });
  };
  document.querySelector(".branch-selectors").hidden = false;
  branchButtons.forEach((button) => button.addEventListener("click", () => selectBranch(button.getAttribute("aria-controls"))));
  selectBranch(branches[0].id);
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!reducedMotion.matches) entry.target.classList.add("is-revealed");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((section) => revealObserver.observe(section));
}

// Hits badge integration adapted from Express Care ef54981. One request per load,
// using the permanent business key supplied by the build, independent of the URL.
const counterImage = document.getElementById("visit-counter-image");
const counterStatus = document.getElementById("visit-counter-status");
if (counterImage && counterStatus) {
  let started = false;
  const loadCounter = () => {
    if (started) return;
    started = true;
    let settled = false;
    const finish = (loaded) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      counterImage.hidden = !loaded;
      counterStatus.hidden = loaded;
      counterStatus.textContent = loaded ? "" : "No disponible";
    };
    const timeout = window.setTimeout(() => finish(false), 12000);
    counterImage.addEventListener("load", () => finish(true), { once: true });
    counterImage.addEventListener("error", () => finish(false), { once: true });
    // The page has finished loading. Fetch this low-priority badge even if the
    // footer is offscreen so the metric remains page loads, rather than scrolls.
    counterImage.loading = "eager";
    counterImage.src = counterImage.dataset.counterSrc;
  };
  const scheduleCounter = () => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(loadCounter, { timeout: 2000 });
    else window.setTimeout(loadCounter, 500);
  };
  if (document.readyState === "complete") scheduleCounter();
  else window.addEventListener("load", scheduleCounter, { once: true });
}
