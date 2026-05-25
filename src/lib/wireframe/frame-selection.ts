// Tiny external store tracking which page-frame on the canvas is currently
// "selected" (clicked on its chrome bar). One frame at most. Used by
// FrameGroup to render a highlight ring, and by FrameActionsBar to show the
// per-frame Copy JSON / Ask AI actions.

let selected: string | null = null;
const listeners = new Set<() => void>();

export const frameSelectionStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  getSnapshot(): string | null {
    return selected;
  },
  select(id: string) {
    if (selected === id) return;
    selected = id;
    listeners.forEach((l) => l());
  },
  clear() {
    if (selected === null) return;
    selected = null;
    listeners.forEach((l) => l());
  },
};
