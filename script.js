(() => {
  const $ = s => document.querySelector(s);
  const fRead = $("#fRead"), fListen = $("#fListen"), fBoth = $("#fBoth");
  const covers = $("#covers"), buy = $("#buy");
  let r = false, l = false;   // при загрузке ничего не выбрано

  function render() {
    const plan = r && l ? "both" : r ? "read" : l ? "listen" : "";
    fRead.checked = r; fListen.checked = l; fBoth.checked = r && l;
    covers.dataset.plan = plan || "both";
    if (plan) { buy.href = buy.dataset[plan]; buy.removeAttribute("aria-disabled"); }
    else { buy.removeAttribute("href"); buy.setAttribute("aria-disabled", "true"); }
  }
  fRead.onchange = e => { r = e.target.checked; render(); };
  fListen.onchange = e => { l = e.target.checked; render(); };
  fBoth.onchange = () => { r = l = true; render(); };   // набор снимается только флажками «Читать» / «Слушать»

  // Окна «Оглавление» и «Фрагмент»: открываются кнопками с data-open, закрываются кнопкой, Esc или щелчком вне окна
  document.querySelectorAll("[data-open]").forEach(b => b.onclick = () => document.getElementById(b.dataset.open).showModal());
  document.querySelectorAll("dialog").forEach(d => d.addEventListener("click", e => {
    if (e.target === d || e.target.closest(".close")) d.close();
  }));

  // Тема: по умолчанию тёмная; выбор запоминается (скрипт в <head> применяет его до отрисовки)
  const root = document.documentElement, tbtn = $("#theme"), meta = $("meta[name=theme-color]");
  function applyTheme(light) {
    if (light) root.setAttribute("data-theme", "light"); else root.removeAttribute("data-theme");
    const label = light ? tbtn.dataset.toDark : tbtn.dataset.toLight;
    tbtn.setAttribute("aria-label", label); tbtn.title = label;
    if (meta) meta.content = light ? "#ffffff" : "#000000";
  }
  tbtn.onclick = () => {
    const light = root.getAttribute("data-theme") !== "light";
    applyTheme(light);
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) {}
  };
  applyTheme(root.getAttribute("data-theme") === "light");

  // Быстрый просмотр смещения обложек: добавьте к адресу ?x=-8 (в процентах)
  const sx = parseFloat(new URLSearchParams(location.search).get("x"));
  if (isFinite(sx)) $(".left").style.setProperty("--covers-x", sx + "%");

  render();
})();
