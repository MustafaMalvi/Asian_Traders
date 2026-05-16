// ─── MENU TOGGLE ───
const menuBtn = document.getElementById("menuBtn");
const navOverlay = document.getElementById("navOverlay");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navOverlay.classList.toggle("open");
  document.body.style.overflow = navOverlay.classList.contains("open") ? "hidden" : "";
});

navOverlay.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    navOverlay.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ─── HEADER SCROLL SHADOW ───
const header = document.getElementById("site-header");
if (header) {
  window.addEventListener("scroll", () => {
    header.style.background = window.scrollY > 40
      ? "rgba(10,10,10,0.97)"
      : "rgba(10,10,10,0.88)";
  }, { passive: true });
}

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ─── IMAGE SLIDERS ───
window.addEventListener("load", () => {
  document.querySelectorAll(".product-card, .product-slider").forEach(card => {
    const track = card.querySelector(".track");
    const dotsContainer = card.querySelector(".slider-dots");
    if (!track || !dotsContainer) return;

    const images = track.querySelectorAll("img");
    dotsContainer.innerHTML = "";

    images.forEach((img, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        track.scrollTo({ left: track.clientWidth * i, behavior: "smooth" });
      });
      dotsContainer.appendChild(dot);
    });

    track.addEventListener("scroll", () => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      dotsContainer.querySelectorAll("span").forEach((d, i) => {
        d.classList.toggle("active", i === index);
      });
    }, { passive: true });
  });
});

// ─── BUSINESS HOURS CHECK ───
function updateHoursBadge() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const hour = now.getHours();
  const min = now.getMinutes();
  const timeVal = hour * 60 + min;
  const openTime = 10 * 60;
  const closeTime = 21 * 60;

  const isOpen = day !== 0 && timeVal >= openTime && timeVal < closeTime;

  document.querySelectorAll(".hours-badge").forEach(badge => {
    const dot = badge.querySelector(".hours-dot");
    const label = badge.querySelector("span:last-child") || badge;
    if (dot) dot.style.background = isOpen ? "#4ade80" : "#f87171";
    badge.innerHTML = `<div class="hours-dot" style="background:${isOpen ? "#4ade80" : "#f87171"};width:7px;height:7px;border-radius:50%;"></div> ${isOpen ? "Open Now" : (day === 0 ? "Closed Today (Sunday)" : "Currently Closed")}`;
  });
}
updateHoursBadge();

// ─── PREFILL PRODUCT SELECT (index page) ───
function prefillProduct(name) {
  setTimeout(() => {
    const sel = document.getElementById("bProduct");
    if (!sel) return;
    for (let opt of sel.options) {
      if (opt.value === name) { sel.value = name; break; }
    }
  }, 300);
}

// Pre-fill from sessionStorage (coming from products page)
window.addEventListener("DOMContentLoaded", () => {
  const stored = sessionStorage.getItem("bookProduct");
  if (stored) {
    const sel = document.getElementById("bProduct");
    if (sel) {
      for (let opt of sel.options) {
        if (opt.value === stored) { sel.value = stored; break; }
      }
    }
    sessionStorage.removeItem("bookProduct");
  }
});

// ─── TOAST ───
function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  if (!toast) return;
  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4000);
}

// ─── WHATSAPP NUMBER ───
const WA_NUMBER = "917984777292";

function sendToWhatsApp(text) {
  const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
}

// ─── BOOKING FORM ───
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name    = document.getElementById("bName").value.trim();
    const phone   = document.getElementById("bPhone").value.trim();
    const email   = document.getElementById("bEmail").value.trim();
    const product = document.getElementById("bProduct").value;
    const message = document.getElementById("bMessage").value.trim();

    const text =
      "📦 *New Order Booking — Asian Traders Website*\n\n" +
      "👤 *Name:* " + name + "\n" +
      "📞 *Phone:* " + phone + "\n" +
      (email ? "✉️ *Email:* " + email + "\n" : "") +
      "🏷️ *Product:* " + product + "\n\n" +
      "📝 *Details / Quantity:*\n" + message + "\n\n" +
      "_Sent via asiantraders.shop_";

    sendToWhatsApp(text);
    showToast("Booking sent! We'll confirm on WhatsApp.");
    bookingForm.reset();
  });
}

// ─── CONTACT / ENQUIRY FORM ───
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name    = document.getElementById("cName").value.trim();
    const email   = document.getElementById("cEmail").value.trim();
    const phone   = document.getElementById("cPhone").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    const text =
      "💬 *New Enquiry — Asian Traders Website*\n\n" +
      "👤 *Name:* " + name + "\n" +
      "📞 *Phone:* " + phone + "\n" +
      (email ? "✉️ *Email:* " + email + "\n" : "") +
      "\n📝 *Message:*\n" + message + "\n\n" +
      "_Sent via asiantraders.shop_";

    sendToWhatsApp(text);
    showToast("Enquiry sent via WhatsApp!");
    contactForm.reset();
  });
}
