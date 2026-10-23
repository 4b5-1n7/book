(() => {
  const $ = s => document.querySelector(s);
  const fRead = $("#fRead"), fListen = $("#fListen"), fBoth = $("#fBoth");
  const covers = $("#covers"), buy = $("#buy"), dlg = $("#excerpt");
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

  $("#peek").onclick = () => dlg.showModal();
  $("#close").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  // Быстрый просмотр смещения обложек: добавьте к адресу ?x=-8 (в процентах)
  const sx = parseFloat(new URLSearchParams(location.search).get("x"));
  if (isFinite(sx)) $(".left").style.setProperty("--covers-x", sx + "%");

  render();
})();
