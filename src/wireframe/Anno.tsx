import type { ReactNode } from "react";

/**
 * Layout-neutral wrapper that marks a real page section as a leader-line anchor.
 * Renders a plain block <div> so it does not change the page layout.
 */
export function Anno({ id, children }: { id: string; children: ReactNode }) {
  return <div data-anchor={id}>{children}</div>;
}
