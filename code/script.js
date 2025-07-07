// ================================
//  script.js – Versión nube (SheetDB)
// ================================

// 1) Renderizar íconos Lucide
lucide.createIcons();

// 2) Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// 3) Animación de revelado al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4) Envío de formulario a Google Sheets vía SheetDB
// -----------------------------------------------------------------
//   Paso previo:  
//   • Crea una hoja de cálculo en Google Sheets con las columnas   
//     Fecha | Nombre | Correo | Telefono | Mensaje                
//   • Conéctala a https://sheetdb.io (es gratis hasta 500 filas).  
//   • Copia tu endpoint: https://sheetdb.io/api/v1/<TU_API_KEY>
//   • Pegalo en la constante ENDPOINT.
// -----------------------------------------------------------------

const ENDPOINT = "https://sheetdb.io/api/v1/gwofmuto20okx"; //  ⬅️  Sustituye AQUÍ
const form   = document.getElementById("contact-form");
const status = document.getElementById("form-status");

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