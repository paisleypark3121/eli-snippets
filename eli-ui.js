(function () {
  function initFullscreenButton() {
    var btn = document.getElementById("eliToggleFullscreen");
    if (!btn) return;

    var ICON_EXPAND = "\u2922";
    var ICON_BACK_TEXT = "\u21A9\uFE0E";

    function setLabel(expanded) {
      btn.innerHTML = expanded
        ? '<span class="eli-icon" aria-hidden="true">' + ICON_BACK_TEXT + '</span> Restore'
        : '<span class="eli-icon" aria-hidden="true">' + ICON_EXPAND + '</span> Expand';
      btn.setAttribute("aria-label", expanded ? "Restore layout" : "Expand to full width");
      btn.setAttribute("aria-pressed", String(expanded));
    }

    // Chiudi i drawer (Boost)
    function closeBoostDrawers() {
      var leftDrawer = document.getElementById('theme_boost-drawers-courseindex');
      if (leftDrawer && leftDrawer.classList.contains('show')) {
        var leftCloseBtn = leftDrawer.querySelector('button.drawertoggle[data-action="closedrawer"]');
        if (leftCloseBtn) leftCloseBtn.click();
        else {
          leftDrawer.classList.remove('show');
          leftDrawer.setAttribute('aria-hidden','true');
        }
      }

      var rightDrawer = document.getElementById('theme_boost-drawers-blocks');
      if (rightDrawer && rightDrawer.classList.contains('show')) {
        var rightCloseBtn = rightDrawer.querySelector('button.drawertoggle[data-action="closedrawer"]');
        if (rightCloseBtn) rightCloseBtn.click();
        else {
          rightDrawer.classList.remove('show');
          rightDrawer.setAttribute('aria-hidden','true');
        }
      }

      document.body.classList.remove('drawer-open-left','drawer-open-right','show-drawer-left','show-drawer-right');
    }

    // Apri il course index e fai "Expand all"
    function openBoostCourseIndexDrawerAndExpand() {
      var opener =
        document.querySelector('.drawertoggle[data-action="opendrawer"][data-target="theme_boost-drawers-courseindex"]')
        || document.querySelector('button[data-action="opendrawer"][data-target="theme_boost-drawers-courseindex"]');

      var leftDrawer = document.getElementById('theme_boost-drawers-courseindex');

      if (opener) {
        opener.click(); // apertura "ufficiale"
      } else if (leftDrawer) {
        // fallback: forza apertura
        leftDrawer.classList.add('show');
        leftDrawer.setAttribute('aria-hidden','false');
        document.body.classList.add('drawer-open-left');
      }

      // dopo l’apertura, prova a cliccare "Expand all"
      setTimeout(function () {
        var expandAll = document.querySelector(
          '#theme_boost-drawers-courseindex [data-action="expandallcourseindexsections"]'
        );
        if (expandAll) expandAll.click();
      }, 250); // piccolo delay per lasciare tempo al drawer di montarsi
    }

    // reset eventuali listener pre-esistenti
    var clone = btn.cloneNode(true);
    btn.parentNode.replaceChild(clone, btn);
    btn = document.getElementById("eliToggleFullscreen");

    btn.addEventListener("click", function () {
      var currentlyFullscreen = document.body.classList.contains("eli-fullscreen");

      if (!currentlyFullscreen) {
        // Stai ENTRANDO nel fullscreen
        closeBoostDrawers();
        document.body.classList.add("eli-fullscreen");
        setLabel(true);
      } else {
        // Stai USCENDO dal fullscreen
        document.body.classList.remove("eli-fullscreen");
        setLabel(false);
        openBoostCourseIndexDrawerAndExpand(); // 👈 riapri + expand
      }
    });

    setLabel(document.body.classList.contains("eli-fullscreen"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFullscreenButton, { once: true });
  } else {
    initFullscreenButton();
  }
})();


// (function () {
//   function initFullscreenButton() {
//     var btn = document.getElementById("eliToggleFullscreen");
//     if (!btn) return;

//     var ICON_EXPAND = "\u2922";       // ⤢ (sempre testo)
//     var ICON_BACK_TEXT = "\u21A9\uFE0E"; // ↩︎ (forzato testo, niente emoji)

//     function setLabel(expanded) {
//       // uso innerHTML per inserire una <span> icona con spacing controllato
//       btn.innerHTML = (expanded
//         ? '<span class="eli-icon" aria-hidden="true">' + ICON_BACK_TEXT + '</span> Back to normal view'
//         : '<span class="eli-icon" aria-hidden="true">' + ICON_EXPAND + '</span> Expand to full width');
//       btn.setAttribute("aria-pressed", String(expanded));
//     }

//     btn.addEventListener("click", function () {
//       document.body.classList.toggle("eli-fullscreen");
//       setLabel(document.body.classList.contains("eli-fullscreen"));
//     });

//     setLabel(document.body.classList.contains("eli-fullscreen"));
//   }

//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", initFullscreenButton, { once: true });
//   } else {
//     initFullscreenButton();
//   }
// })();
