// Mobile navigation toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// The contact form has no backend: it composes the message and hands it to
// WhatsApp or the visitor's email client, depending on the button pressed.
const form = document.querySelector("#contact-form");
if (form) {
  const PHONE = "56940502797";
  const EMAIL = "cpcasascordero@gmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [
      `Hola Carolina, my name is ${data.get("name")}.`,
      data.get("interest") ? `I'm interested in: ${data.get("interest")}.` : "",
      "",
      data.get("message"),
      "",
      data.get("email") ? `You can reach me at ${data.get("email")}.` : "",
    ].filter((line, i, all) => line !== "" || (all[i - 1] ?? "") !== "");
    const text = lines.join("\n").trim();

    const via = event.submitter?.value ?? "whatsapp";
    if (via === "email") {
      const subject = `Habitar el Camino: ${data.get("interest") || "Consulta"}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  });
}
