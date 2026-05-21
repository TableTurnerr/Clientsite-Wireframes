import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";

function HeaderPage() {
  return (
    <div style={{ paddingBottom: 320 }}>
      <Anno id="hdr">
        <Header />
      </Anno>
    </div>
  );
}

export const header: WirePage = {
  id: "header",
  title: "Header",
  route: "/ · global",
  group: "Shared Chrome & States",
  Page: HeaderPage,
  notes: [
    {
      id: "n-1",
      anchor: "hdr",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared `<Header>` — sticky, `\"use client\"`" },
        { sys: "brand", text: "Logo + name = `RESTAURANT.name`" },
        { sys: "brand", text: "Phone = `RESTAURANT.phone` (`QRHover`)" },
      ],
    },
    {
      id: "n-2",
      anchor: "hdr",
      side: "right",
      title: "Nav + CTA",
      lines: [
        { sys: "layout", text: "`NAV_LINKS` (trailing-slash routes)" },
        { sys: "brand", text: "Order CTA = `RESTAURANT.orderOnline`" },
        { sys: "color", text: "Bg `#fff/85` blur; link hover `--color-text`" },
      ],
    },
  ],
};
