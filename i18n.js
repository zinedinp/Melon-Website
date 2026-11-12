(() => {
  const langs = window.MelonLang || {};
  const site = window.MelonSite || {};
  const base = "de";
  const root = document.documentElement;
  const store = (fn) => { try { return fn(localStorage); } catch { return null; } };

  const initial = () => {
    const wanted = [
      new URLSearchParams(location.search).get("lang"),
      store((s) => s.getItem("lang")),
      (navigator.language || "").slice(0, 2),
    ];
    return wanted.find((l) => l && l in langs) || base;
  };

  const fill = (s) => s.replace(/\{(\w+)\}/g, (m, k) => (k in site ? site[k] : m));
  const text = (lang, key) => fill(langs[lang]?.[key] ?? langs[base]?.[key] ?? key);

  const apply = (lang) => {
    root.lang = lang;
    for (const el of document.querySelectorAll("[data-i18n]")) {
      el.textContent = text(lang, el.dataset.i18n);
      // Die Leuchtschrift zeichnet ihre Kontur aus data-t.
      const fx = el.parentElement;
      if (fx && fx.classList.contains("fx")) fx.dataset.t = el.textContent;
    }
    for (const el of document.querySelectorAll("[data-i18n-html]")) {
      el.innerHTML = text(lang, el.dataset.i18nHtml);
    }
    for (const el of document.querySelectorAll("[data-i18n-content]")) {
      el.setAttribute("content", text(lang, el.dataset.i18nContent));
    }
    for (const el of document.querySelectorAll("[data-i18n-aria]")) {
      el.setAttribute("aria-label", text(lang, el.dataset.i18nAria));
    }
    for (const el of document.querySelectorAll("[data-site]")) {
      if (site[el.dataset.site]) el.href = site[el.dataset.site];
    }
    for (const a of document.querySelectorAll(".lang a")) {
      if (a.dataset.lang === lang) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    }
  };

  const switcher = () => {
    for (const box of document.querySelectorAll(".lang")) {
      for (const code of Object.keys(langs)) {
        const a = document.createElement("a");
        a.href = `?lang=${code}`;
        a.lang = a.hreflang = a.dataset.lang = code;
        a.textContent = code.toUpperCase();
        a.addEventListener("click", (e) => {
          e.preventDefault();
          store((s) => s.setItem("lang", code));
          history.replaceState(null, "", `?lang=${code}${location.hash}`);
          apply(code);
        });
        box.append(a);
      }
    }
  };

  switcher();
  apply(initial());
})();
