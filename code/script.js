// ================================
//  script.js – Versión nube (SheetDB)
// ================================

lucide.createIcons();

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const ENDPOINT = "https://sheetdb.io/api/v1/gwofmuto20okx"; 
const form   = document.getElementById("contact-form");
const status = document.getElementById("form-status");
//Datos del cliente
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Enviando…";

 const payload = {
    data: {
      FECHA:   new Date().toLocaleString(),
      NOMBRE:  form.name.value,
      CORREO:  form.email.value,
      TELEFONO:form.phone.value,
      MENSAJES: form.message.value
    }
  };


  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      status.textContent = "¡Gracias! Tus datos fueron guardados.";
      form.reset();
    } else {
      throw new Error("Respuesta de red no OK");
    }
  } catch (err) {
    console.error(err);
    status.textContent = "Hubo un problema. Intenta nuevamente o contáctanos.";
  }
});

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("solo-numero")) {
    // reemplaza cualquier carácter que NO sea 0‑9
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }
});
