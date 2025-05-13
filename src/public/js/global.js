function afterLoad(cb) {
  if (document.readyState === "complete") {
    cb();
  } else {
    window.addEventListener("load", cb);
  }
}

const PopupMenu = (function () {
  const activeMenus = new Set();

  function attach(triggerEl, popupEl, options = {}) {
    // 기본 옵션
    const { position = "bottom-right", offset = 4 } = options;

    if (!triggerEl || !popupEl) return;

    triggerEl.style.cursor = "pointer";
    popupEl.style.position = "absolute";
    popupEl.style.zIndex = 9999;
    popupEl.style.display = "none";

    function positionPopup() {
      const rect = triggerEl.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = rect.bottom + offset + scrollTop;
      let left = rect.left + scrollLeft;

      // Temporarily make it visible to measure its size
      popupEl.style.visibility = "hidden";
      popupEl.style.display = "flex";
      const popupWidth = popupEl.offsetWidth;
      const popupHeight = popupEl.offsetHeight;
      popupEl.style.display = "none";
      popupEl.style.visibility = "";

      if (position === "bottom-right") {
        if (left + popupWidth > scrollLeft + viewportWidth) {
          left = scrollLeft + viewportWidth - popupWidth - 10;
        }
        if (top + popupHeight > scrollTop + viewportHeight) {
          top = rect.top - popupHeight - offset + scrollTop;
        }
      } else if (position === "bottom-left") {
        left = rect.right - popupWidth + scrollLeft;
        if (left < scrollLeft) {
          left = scrollLeft + 10;
        }
        if (top + popupHeight > scrollTop + viewportHeight) {
          top = rect.top - popupHeight - offset + scrollTop;
        }
      }

      popupEl.style.top = `${top}px`;
      popupEl.style.left = `${left}px`;
    }

    triggerEl.addEventListener("click", (e) => {
      e.stopPropagation();

      const isOpen = popupEl.style.display === "flex";

      // 모든 팝업 닫기
      closeAll();

      if (!isOpen) {
        positionPopup();
        popupEl.style.display = "flex";
        activeMenus.add(popupEl);
      }
    });

    // 외부 클릭 시 닫기
    document.addEventListener("click", () => {
      popupEl.style.display = "none";
      activeMenus.delete(popupEl);
    });
  }

  function closeAll() {
    activeMenus.forEach((menu) => {
      menu.style.display = "none";
    });
    activeMenus.clear();
  }

  return { attach };
})();
