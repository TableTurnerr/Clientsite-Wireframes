import type { WireframePage } from "@/canvas/types";
import { Section } from "./sections";

export function WireframeFrame({
  page,
  width,
}: {
  page: WireframePage;
  width: number;
}) {
  return (
    <div className="wf-frame" style={{ width }}>
      <div className="wf-chrome">
        <div className="wf-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="wf-url">al-baghdady.com{page.route}</div>
        <div className="wf-pagetag">{page.title}</div>
      </div>
      <div className="wf-body">
        {page.sections.map((s) => (
          <Section key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}
