(function () {
  function initFullscreenButton() {
    var btn = document.getElementById("eliToggleFullscreen");
    if (!btn) return;

    var ICON_EXPAND = "\u2922";       // ⤢ (sempre testo)
    var ICON_BACK_TEXT = "\u21A9\uFE0E"; // ↩︎ (forzato testo, niente emoji)

    function setLabel(expanded) {
      // uso innerHTML per inserire una <span> icona con spacing controllato
      btn.innerHTML = (expanded
        ? '<span class="eli-icon" aria-hidden="true">' + ICON_BACK_TEXT + '</span> Back to normal view'
        : '<span class="eli-icon" aria-hidden="true">' + ICON_EXPAND + '</span> Expand to full width');
      btn.setAttribute("aria-pressed", String(expanded));
    }

    btn.addEventListener("click", function () {
      document.body.classList.toggle("eli-fullscreen");
      setLabel(document.body.classList.contains("eli-fullscreen"));
    });

    setLabel(document.body.classList.contains("eli-fullscreen"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFullscreenButton, { once: true });
  } else {
    initFullscreenButton();
  }
})();
