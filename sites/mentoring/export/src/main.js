gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const shortWords = /(^|[\s([«„"—–-])(а|без|в|во|для|до|за|и|из|к|ко|на|не|ни|но|о|об|от|по|под|при|про|с|со|у)\s+(?=[А-Яа-яЁё0-9«„"])/giu;
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];

while (walker.nextNode()) {
  const node = walker.currentNode;
  if (node.nodeValue.trim() && !node.parentElement?.closest("script,style,noscript,textarea")) textNodes.push(node);
}
textNodes.forEach((node) => { node.nodeValue = node.nodeValue.replace(shortWords, "$1$2\u00a0"); });

document.querySelectorAll("[data-widget-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.widgetOpen);
    if (dialog instanceof HTMLDialogElement) {
      dialog.showModal();
      document.body.classList.add("modal-open");
    }
  });
});

document.querySelectorAll(".widget-modal").forEach((dialog) => {
  const close = () => {
    dialog.close();
    document.body.classList.remove("modal-open");
  };
  dialog.querySelector("[data-widget-close]")?.addEventListener("click", close);
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
});

if (!reducedMotion) {
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero__visual", { opacity: 0, scale: 0.94, filter: "blur(12px)", duration: 1.1 })
    .from(".hero__kicker", { opacity: 0, y: 12, duration: 0.45 }, 0.2)
    .from(".hero h1", { opacity: 0, y: 28, filter: "blur(7px)", duration: 0.85 }, 0.3)
    .from(".hero__action-row", { opacity: 0, y: 18, duration: 0.6 }, 0.58);

  document.querySelectorAll(".section-head, .syllabus header").forEach((heading) => {
    gsap.from(heading, {
      opacity: 0,
      y: 28,
      filter: "blur(6px)",
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: heading, start: "top 84%", once: true }
    });
  });

  document.querySelectorAll(".evolution__track, .program-map__grid, .market-shift__grid, .practice-models__grid, .graduate-results__grid, .niches__grid").forEach((group) => {
    gsap.from(group.children, {
      opacity: 0,
      y: 26,
      duration: 0.65,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: group, start: "top 82%", once: true }
    });
  });
}

window.addEventListener("load", () => ScrollTrigger.refresh());
