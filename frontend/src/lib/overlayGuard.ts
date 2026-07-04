/**
 * Radix overlays (Dialog, DropdownMenu) set `pointer-events: none` on <body>
 * while open. If two overlays tear down out of order, or an exit animation is
 * throttled (backgrounded tab), that style can be left behind and the whole
 * page becomes unclickable. This guard clears it as soon as the user interacts
 * while no overlay is actually open.
 */
export function installOverlayGuard() {
  const heal = () => {
    const openOverlay = document.querySelector(
      '[role="dialog"][data-state="open"], [data-radix-popper-content-wrapper]'
    );
    if (openOverlay) return;

    if (document.body.style.pointerEvents === "none") {
      document.body.style.pointerEvents = "";
    }
    // A dialog whose exit animation was throttled (e.g. backgrounded tab) can
    // leave react-remove-scroll's body lock behind; release it too.
    if (document.body.hasAttribute("data-scroll-locked")) {
      document.body.removeAttribute("data-scroll-locked");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  };

  document.addEventListener("pointerdown", heal, true);
  document.addEventListener("keydown", heal, true);
  window.addEventListener("focus", heal);
  document.addEventListener("visibilitychange", heal);
}
