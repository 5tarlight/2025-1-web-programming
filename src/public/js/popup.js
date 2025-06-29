/**
 * 클로저(Closure)를 이용한 팝업 메뉴 모듈
 * anonymous 함수로 정의됨. (() => {})() : 익명 함수를 즉시 실행
 *
 * 내부적으로 Set에 활성화된 팝업 메뉴를 저장하여 관리.
 *
 */
const PopupMenu = (function () {
  const activeMenus = new Set();

  /**
   * @typedef {Object} PopupOptions
   * @property {'bottom-right' | 'bottom-left'} [position]
   * @property {number} [offset]
   */

  /**
   * 팝업 메뉴를 트리거에 연결합니다.
   *
   * @param {HTMLElement} triggerEl - 팝업을 여는 트리거 엘리먼트
   * @param {HTMLElement} popupEl - 실제 팝업 DOM 엘리먼트
   * @param {PopupOptions} [options] - 옵션 (위치, 오프셋 등)
   */
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

      // GPT 도움 : 잠깐 보이게 만들어서 크기 계산
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
    document.addEventListener("click", (e) => {
      if (!popupEl.contains(e.target)) {
        popupEl.style.display = "none";
        activeMenus.delete(popupEl);
      }
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
