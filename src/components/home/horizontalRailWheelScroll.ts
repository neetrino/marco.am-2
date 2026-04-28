const DRAG_THRESHOLD_PX = 8;

function suppressFollowingClick(): void {
  const block = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
    window.removeEventListener('click', block, true);
  };
  window.addEventListener('click', block, true);
}

/**
 * Click-drag (mouse / pen) to change `scrollLeft`. Touch is skipped so native
 * horizontal pan and nested gestures are not double-handled.
 */
export function bindPointerDragHorizontalScroll(el: HTMLDivElement): () => void {
  let activeId: number | null = null;
  let startClientX = 0;
  let startScrollLeft = 0;
  let dragging = false;

  const detachDocument = () => {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerEnd);
    document.removeEventListener('pointercancel', onPointerEnd);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerId !== activeId) {
      return;
    }
    const dx = e.clientX - startClientX;
    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) {
        return;
      }
      dragging = true;
      el.style.userSelect = 'none';
    }
    e.preventDefault();
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    el.scrollLeft = Math.max(0, Math.min(maxScroll, startScrollLeft - dx));
  };

  const onPointerEnd = (e: PointerEvent) => {
    if (e.pointerId !== activeId) {
      return;
    }
    const wasDragging = dragging;
    if (wasDragging) {
      suppressFollowingClick();
      el.style.userSelect = '';
    }
    detachDocument();
    activeId = null;
    dragging = false;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      return;
    }
    if (e.pointerType === 'mouse' && e.button !== 0) {
      return;
    }
    if (el.scrollWidth <= el.clientWidth + 1) {
      return;
    }
    if (e.target instanceof Element && e.target.closest('button')) {
      return;
    }

    activeId = e.pointerId;
    startClientX = e.clientX;
    startScrollLeft = el.scrollLeft;
    dragging = false;
    document.addEventListener('pointermove', onPointerMove, { passive: false });
    document.addEventListener('pointerup', onPointerEnd);
    document.addEventListener('pointercancel', onPointerEnd);
  };

  el.addEventListener('pointerdown', onPointerDown);

  return () => {
    el.removeEventListener('pointerdown', onPointerDown);
    detachDocument();
    el.style.userSelect = '';
  };
}
