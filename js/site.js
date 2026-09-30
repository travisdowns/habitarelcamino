// Mobile navigation toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Remember an explicit language choice; the home page redirect respects it.
for (const link of document.querySelectorAll("a[data-lang]")) {
  link.addEventListener("click", () => {
    try {
      localStorage.setItem("hec-lang", link.dataset.lang);
    } catch {
      // Storage unavailable (private mode, blocked site data): nothing to remember.
    }
  });
}

// The contact form has no backend: it composes the message and hands it to
// WhatsApp or the visitor's email client, depending on the button pressed.
const STRINGS = {
  es: {
    greeting: (name) => `Hola Carolina, mi nombre es ${name}.`,
    interest: (topic) => `Me interesa: ${topic}.`,
    reply: (email) => `Puedes escribirme a ${email}.`,
    subject: (topic) => `Habitar el Camino: ${topic || "Consulta"}`,
  },
  en: {
    greeting: (name) => `Hi Carolina, my name is ${name}.`,
    interest: (topic) => `I'm interested in: ${topic}.`,
    reply: (email) => `You can reach me at ${email}.`,
    subject: (topic) => `Habitar el Camino: ${topic || "Enquiry"}`,
  },
};

const form = document.querySelector("#contact-form");
if (form) {
  const PHONE = "56940502797";
  const EMAIL = "cpcasascordero@gmail.com";
  const s = STRINGS[document.documentElement.lang] ?? STRINGS.es;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const interest = data.get("interest");
    const email = data.get("email");
    const text = [
      s.greeting(data.get("name")),
      interest ? s.interest(interest) : null,
      "",
      data.get("message"),
      email ? "" : null,
      email ? s.reply(email) : null,
    ]
      .filter((line) => line !== null)
      .join("\n")
      .trim();

    const via = event.submitter?.value ?? "whatsapp";
    if (via === "email") {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(s.subject(interest))}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  });
}
