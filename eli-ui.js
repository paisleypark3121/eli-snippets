(function () {
  function initFullscreenButton() {
    var btn = document.getElementById("eliToggleFullscreen");
    if (!btn) return;

    function updateLabel() {
      var expanded = document.body.classList.contains("eli-fullscreen");
      btn.textContent = expanded ? "↩ Back to normal view" : "⤢ Expand to full width";
      btn.setAttribute("aria-pressed", String(expanded));
    }

    btn.addEventListener("click", function () {
      document.body.classList.toggle("eli-fullscreen");
      updateLabel();
    });

    updateLabel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFullscreenButton, { once: true });
  } else {
    initFullscreenButton();
  }
})();
