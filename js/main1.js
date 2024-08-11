!(function () {
  const e = document.documentElement;
  if (
    (e.classList.remove("no-js"),
    e.classList.add("js"),
    document.body.classList.contains("has-animations"))
  ) {
    const e = (window.sr = ScrollReveal());
    e.reveal(".hero-title, .hero-paragraph, .hero-cta", {
      duration: 1e3,
      distance: "40px",
      easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
      origin: "left",
      interval: 150,
    }),
      e.reveal(".hero-illustration", {
        duration: 1e3,
        distance: "40px",
        easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
        origin: "right",
        interval: 150,
      }),
      e.reveal(".feature", {
        duration: 1e3,
        distance: "40px",
        easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
        interval: 100,
        origin: "bottom",
        scale: 0.9,
        viewFactor: 0.5,
      }),
      document.querySelectorAll(".pricing-table").forEach((i) => {
        const t = [].slice.call(i.querySelectorAll(".pricing-table-header")),
          a = [].slice.call(i.querySelectorAll(".pricing-table-features li")),
          c = [].slice.call(i.querySelectorAll(".pricing-table-cta")),
          r = t.concat(a).concat(c);
        e.reveal(r, {
          duration: 600,
          distance: "20px",
          easing: "cubic-bezier(0.5, -0.01, 0, 1.005)",
          interval: 100,
          origin: "bottom",
          viewFactor: 0.5,
        });
      });
  }
})();





function copyToClipboard(text) {
  // Crear un elemento de texto temporal
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);

  // Seleccionar el texto del elemento temporal
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Para dispositivos móviles

  // Copiar el texto al portapapeles
  document.execCommand('copy');

  // Eliminar el elemento temporal
  document.body.removeChild(tempInput);

  // Opcional: notificar al usuario
  alert('Texto copiado al portapapeles!');
}

