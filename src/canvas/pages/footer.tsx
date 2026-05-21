import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Footer from "@/components/layout/Footer";

function FooterPage() {
  return (
    <Anno id="ftr">
      <Footer />
    </Anno>
  );
}

export const footer: WirePage = {
  id: "footer",
  title: "Footer",
  route: "/ · global",
  group: "Shared Chrome & States",
  Page: FooterPage,
  notes: [
    {
      id: "n-1",
      anchor: "ftr",
      side: "left",
      title: "Global Footer",
      lines: [
        { sys: "layout", text: "Shared `<Footer>` on every page" },
        { sys: "color", text: "Bg `--color-text`; bottom bar `--color-primary-dark`" },
        { sys: "brand", text: "Wordmark + `RESTAURANT.footerDescription`" },
      ],
    },
    {
      id: "n-2",
      anchor: "ftr",
      side: "right",
      title: "Contact + socials",
      lines: [
        { sys: "brand", text: "NAP = `RESTAURANT.address` / `phone` / `email`" },
        { sys: "brand", text: "Icons → `RESTAURANT.socials.{instagram,facebook}`" },
        { sys: "seo", text: "Org schema `alternateName` carries legacy brand names" },
      ],
    },
  ],
};
