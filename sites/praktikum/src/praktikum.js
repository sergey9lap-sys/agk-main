const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const shortWords = /(^|[\s([«„"—–-])(а|без|в|во|для|до|за|и|из|к|ко|на|не|ни|но|о|об|от|по|под|при|про|с|со|у)\s+(?=[А-Яа-яЁё0-9«„"])/giu;
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const textNodes = [];

while (walker.nextNode()) {
  const node = walker.currentNode;
  if (node.nodeValue.trim() && !node.parentElement?.closest("script,style,noscript,textarea,input")) textNodes.push(node);
}
textNodes.forEach((node) => { node.nodeValue = node.nodeValue.replace(shortWords, "$1$2\u00a0"); });

const timerKey = "mentoring_praktikum_offer_expires_at";
const duration = 2 * 60 * 60 * 1000;
const storedExpiry = Number(localStorage.getItem(timerKey));
const expiry = Number.isFinite(storedExpiry) && storedExpiry > Date.now() ? storedExpiry : Date.now() + duration;
if (expiry !== storedExpiry) localStorage.setItem(timerKey, String(expiry));

const hoursNode = document.querySelector("[data-hours]");
const minutesNode = document.querySelector("[data-minutes]");
const secondsNode = document.querySelector("[data-seconds]");
const pad = (value) => String(value).padStart(2, "0");

function updateTimer() {
  const remaining = Math.max(0, expiry - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  if (hoursNode) hoursNode.textContent = pad(Math.floor(totalSeconds / 3600));
  if (minutesNode) minutesNode.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  if (secondsNode) secondsNode.textContent = pad(totalSeconds % 60);
}
updateTimer();
const timerId = window.setInterval(() => {
  updateTimer();
  if (Date.now() >= expiry) window.clearInterval(timerId);
}, 1000);

const form = document.querySelector("[data-registration-form]");
const formStatus = document.querySelector("[data-form-status]");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (formStatus) {
    formStatus.hidden = false;
    formStatus.textContent = "Форма подготовлена. Для отправки данных нужен ID бесплатного виджета GetCourse.";
  }
});

if (!reducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const enter = { autoAlpha: 0, y: 22, filter: "blur(5px)", duration: .62, ease: "power3.out", clearProps: "transform,filter,opacity,visibility" };

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".hero h1", { ...enter, y: 28, duration: .76 })
    .from(".hero__lead", { ...enter, duration: .54 }, "-=.38")
    .from(".hero__portrait", { autoAlpha: 0, scale: .965, filter: "blur(8px)", duration: .82, clearProps: "transform,filter,opacity,visibility" }, "-=.32")
    .from(".hero__label", { autoAlpha: 0, y: 10, duration: .34, clearProps: "transform,opacity,visibility" }, "<+.08")
    .from(".hero__actions", { ...enter, y: 16, duration: .48 }, "-=.48")
    .from(".hero__materials-title", { autoAlpha: 0, y: 10, duration: .36, clearProps: "transform,opacity,visibility" }, "-=.3")
    .from(".hero__materials-visual", { autoAlpha: 0, y: 14, duration: .48, clearProps: "transform,opacity,visibility" }, "-=.22")
    .from(".timer", { autoAlpha: 0, y: 12, duration: .42, clearProps: "transform,opacity,visibility" }, "-=.22");

  const sectionTimeline = (trigger) => gsap.timeline({
    defaults: { ease: "power3.out" },
    scrollTrigger: { trigger, start: "top 82%", once: true }
  });

  sectionTimeline(".audience")
    .from(".audience h2", { ...enter })
    .from(".audience .section-kicker, .audience__heading>p:not(.section-kicker)", { ...enter, y: 14, duration: .44, stagger: .06 }, "-=.34")
    .from(".audience__rows article", { ...enter, y: 18, duration: .46, stagger: .07 }, "-=.24")
    .from(".audience__action", { ...enter, y: 12, duration: .4 }, "-=.2");

  sectionTimeline(".economy")
    .from(".economy h2", { ...enter })
    .from(".economy__number, .economy__statement>p:last-child", { ...enter, y: 16, duration: .48, stagger: .08 }, "-=.34")
    .from(".economy__list h3", { ...enter, y: 12, duration: .4 }, "-=.3")
    .from(".economy__list li", { autoAlpha: 0, y: 12, duration: .38, stagger: .055, clearProps: "transform,opacity,visibility" }, "-=.2")
    .from(".economy__list .button", { ...enter, y: 10, duration: .4 }, "-=.16");

  sectionTimeline(".author")
    .from(".author h2", { ...enter })
    .from(".author__label, .author__lead", { ...enter, y: 12, duration: .42, stagger: .06 }, "-=.34")
    .from(".author__photo", { autoAlpha: 0, scale: .975, filter: "blur(6px)", duration: .66, clearProps: "transform,filter,opacity,visibility" }, "-=.3")
    .from(".author__stats p", { autoAlpha: 0, y: 14, duration: .4, stagger: .06, clearProps: "transform,opacity,visibility" }, "-=.28")
    .from(".author__facts p", { autoAlpha: 0, y: 12, duration: .38, stagger: .055, clearProps: "transform,opacity,visibility" }, "-=.24");

  sectionTimeline(".access")
    .from(".access h2", { ...enter })
    .from(".access__copy p", { ...enter, y: 12, duration: .42 }, "-=.34")
    .from(".access__form label", { autoAlpha: 0, y: 14, duration: .42, stagger: .065, clearProps: "transform,opacity,visibility" }, "-=.24")
    .from(".access__form .button, .access__legal", { ...enter, y: 10, duration: .4, stagger: .06 }, "-=.18");
}
