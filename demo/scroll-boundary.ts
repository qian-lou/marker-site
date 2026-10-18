type LocalScrollOptions = ScrollIntoViewOptions & { container: 'nearest' };

/** Keep the real app's heading/editor scrolling inside its website iframe. */
export function installEmbeddedScrollBoundary(): void {
  if (window.parent === window) return;

  const nativeScrollIntoView = Element.prototype.scrollIntoView;
  let supportsNearest = false;
  try {
    // Web IDL reads known dictionary members before checking for a layout box.
    // A detached probe cannot scroll the host page during capability detection.
    nativeScrollIntoView.call(document.createElement('div'), {
      get container() { supportsNearest = true; return 'nearest'; },
    } as LocalScrollOptions);
  } catch {
    supportsNearest = false;
  }

  Element.prototype.scrollIntoView = function (options?: boolean | ScrollIntoViewOptions): void {
    const settings: ScrollIntoViewOptions = typeof options === 'boolean'
      ? { block: options ? 'start' : 'end' }
      : options ?? {};
    if (supportsNearest) {
      nativeScrollIntoView.call(this, { ...settings, container: 'nearest' } as LocalScrollOptions);
      return;
    }

    // Older browsers ignore `container`; scroll the nearest app pane ourselves.
    // O(D) for ancestor depth D, without walking into the containing page.
    let pane = this.parentElement;
    while (pane && pane !== document.body && pane !== document.documentElement) {
      const style = getComputedStyle(pane);
      const scrollsY = /(auto|scroll|hidden)/.test(style.overflowY) && pane.scrollHeight > pane.clientHeight;
      const scrollsX = /(auto|scroll|hidden)/.test(style.overflowX) && pane.scrollWidth > pane.clientWidth;
      if (scrollsY || scrollsX) {
        const elementRect = this.getBoundingClientRect();
        const paneRect = pane.getBoundingClientRect();
        const elementStyle = getComputedStyle(this);
        const pixels = (value: string) => Number.parseFloat(value) || 0;
        const offset = (start: number, end: number, align: ScrollLogicalPosition): number => {
          if (align === 'start') return start;
          if (align === 'end') return end;
          if (align === 'center') return (start + end) / 2;
          if (start < 0 && end > 0) return 0;
          return start < 0 ? start : end > 0 ? end : 0;
        };
        const top = elementRect.top - paneRect.top - pane.clientTop
          - pixels(style.scrollPaddingTop) - pixels(elementStyle.scrollMarginTop);
        const bottom = elementRect.bottom - paneRect.top - pane.clientTop - pane.clientHeight
          + pixels(style.scrollPaddingBottom) + pixels(elementStyle.scrollMarginBottom);
        const left = elementRect.left - paneRect.left - pane.clientLeft
          - pixels(style.scrollPaddingLeft) - pixels(elementStyle.scrollMarginLeft);
        const right = elementRect.right - paneRect.left - pane.clientLeft - pane.clientWidth
          + pixels(style.scrollPaddingRight) + pixels(elementStyle.scrollMarginRight);
        pane.scrollTo({
          top: pane.scrollTop + (scrollsY ? offset(top, bottom, settings.block ?? 'start') : 0),
          left: pane.scrollLeft + (scrollsX ? offset(left, right, settings.inline ?? 'nearest') : 0),
          behavior: settings.behavior ?? 'auto',
        });
        return;
      }
      pane = pane.parentElement;
    }
  };
}
