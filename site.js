window.MelonSite = {
  version: "0.8.0",
  mc: "26.3",
  launcher: "0.1.1",
  // The launcher's platform folder on the CDN; the only one built so far.
  platform: "linux-x86-64",
  cdn: "https://elbengeist.moe/melonmc/cdn",
  repo: "https://github.com/zinedinp/Melon-Client",
};
// Direct links to the launcher binary and its checksum.
{
  const site = window.MelonSite;
  site.launcherUrl = `${site.cdn}/launcher/${site.launcher}/${site.platform}/melon-launcher`;
  site.launcherSha = `${site.launcherUrl}.sha256`;
}

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
