window.MelonSite = {
  version: "0.7.0",
  mc: "26.3",
  repo: "https://github.com/zinedinp/Melon",
};

document.querySelectorAll(".nav .menu").forEach((btn) => {
  btn.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav ul a, .nav > .btn").forEach((a) => {
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
});
