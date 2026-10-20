/* Fase 06 / R2 — links do evento. Substitua apenas os endereços abaixo. */
(() => {
  "use strict";
  const links = Object.freeze({
    teams04: "https://example.org/teams/blueplant-04-11",
    teams11: "https://example.org/teams/blueplant-11-11",
    blueplantInformacoes: "https://example.org/inscricoes/blueplant-presencial",
    minicursoNathan: "https://example.org/inscricoes/nathan",
    minicursoAlgoritmos: "https://example.org/inscricoes/algoritmos",
    minicursoLean: "https://example.org/inscricoes/lean",
    apostila: "https://drive.google.com/drive/folders/1hMrpIKqahc60mZe8Gt5fV3xM7sCzrTSC?usp=sharing",
    apresentacao: "https://drive.google.com/drive/folders/1hMrpIKqahc60mZe8Gt5fV3xM7sCzrTSC?usp=sharing"
  });

  document.querySelectorAll("[data-evento-link]").forEach((anchor) => {
    const key = anchor.getAttribute("data-evento-link");
    const url = links[key];
    if (!url || !/^https:\/\/[^\s]+$/i.test(url)) {
      anchor.setAttribute("aria-disabled", "true");
      anchor.addEventListener("click", (event) => event.preventDefault());
      return;
    }
    let parsed;
    try { parsed = new URL(url); } catch { return; }
    const isDemo = parsed.hostname === "example.org" || parsed.hostname === "example.com" || parsed.hostname === "example.net";
    if (isDemo) {
      anchor.removeAttribute("href");
      anchor.setAttribute("data-link-demo", "true");
      anchor.setAttribute("aria-disabled", "true");
      anchor.title = "Este acesso será ativado com o endereço oficial";
      anchor.addEventListener("click", (event) => event.preventDefault());
    } else {
      anchor.href = url;
      anchor.removeAttribute("aria-disabled");
      anchor.removeAttribute("data-link-demo");
      anchor.removeAttribute("title");
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });
})();
