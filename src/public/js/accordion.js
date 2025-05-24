/**
 * 클로저(Closure)를 이용한 아코디언 메뉴 모듈
 * 익명 함수로 정의됨. (() => {})()
 *
 * 내부적으로 Set에 열린 아코디언 항목을 저장하여 관리.
 */
const Accordion = (function () {
  const activeItems = new Set();

  /**
   * 아코디언을 트리거에 연결합니다.
   *
   * @param {HTMLElement} triggerEl - 클릭 시 아코디언을 여는 버튼/헤더
   * @param {HTMLElement} contentEl - 아코디언 본문 영역
   */
  function attach(triggerEl, contentEl) {
    if (!triggerEl || !contentEl) return;

    contentEl.style.overflow = "hidden";
    contentEl.style.transition = "max-height 0.2s ease";
    contentEl.style.maxHeight = "0px";

    triggerEl.style.cursor = "pointer";

    triggerEl.addEventListener("click", () => {
      const isOpen = activeItems.has(contentEl);

      if (!isOpen) {
        contentEl.style.maxHeight = contentEl.scrollHeight + "px";
        activeItems.add(contentEl);
      } else {
        contentEl.style.maxHeight = "0px";
        activeItems.delete(contentEl);
      }
    });
  }

  return { attach };
})();
