import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { RESTAURANT } from "@/data/restaurant";

// EXACT composition of src/app/return-policy/page.tsx — real components, real CSS.
function ReturnPolicyPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Return Policy", url: "/return-policy/" },
          ]}
        />
      </Anno>

      <Anno id="policy">
        <section className="container-pad py-12 md:py-20 max-w-3xl">
          <div className="eyebrow">Policies</div>
          <h1 className="mb-6">Return &amp; Refund Policy</h1>
          <p className="text-[var(--color-text-muted)] mb-10">
            Last updated: May 2026
          </p>

          <div className="prose-content space-y-6 text-[var(--color-text)] leading-relaxed">
            <h2>Food &amp; bakery orders</h2>
            <p>
              All of our baked goods and prepared food are made fresh daily and are
              perishable. For food-safety reasons we cannot accept returns or
              exchanges on food items once they have left our store.
            </p>
            <p>
              If your order is incorrect, damaged in transit, or doesn&apos;t meet our
              quality standards, please contact us within{" "}
              <strong>24 hours of pickup or delivery</strong> and we will make it
              right — typically with a refund or a replacement, at our discretion.
            </p>

            <h2>Online orders &amp; third-party delivery</h2>
            <p>
              Orders placed through third-party platforms (such as our online
              ordering partner) are subject to that platform&apos;s refund policy
              for delivery-related issues (late delivery, missing items in transit,
              courier complaints). For issues with the food itself, contact us
              directly using the information below and we will work with you.
            </p>

            <h2>Catering orders &amp; deposits</h2>
            <p>
              Catering orders require advance notice and may involve a deposit.
              Our cancellation windows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>72+ hours before the event:</strong> full refund of any
                deposit paid.
              </li>
              <li>
                <strong>24–72 hours before the event:</strong> 50% of any deposit
                is refundable; the remainder covers ingredients already
                committed to your order.
              </li>
              <li>
                <strong>Less than 24 hours before the event:</strong> deposits are
                non-refundable, as your order has already entered preparation.
              </li>
            </ul>
            <p>
              For changes to a catering order (head count, menu adjustments,
              timing), reach out as early as possible and we will accommodate
              where we can.
            </p>

            <h2>How to reach us</h2>
            <p>
              The fastest way to resolve any concern is to call or email us
              directly:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Phone:{" "}
                <a
                  href={`tel:${RESTAURANT.phoneRaw}`}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="text-[var(--color-primary)] hover:underline"
                >
                  {RESTAURANT.email}
                </a>
              </li>
              <li>
                In person: {RESTAURANT.address.full} (during business hours)
              </li>
            </ul>

            <p className="text-sm text-[var(--color-text-muted)] mt-8">
              This policy applies to direct purchases from {RESTAURANT.legalName}
              . Orders fulfilled through third-party marketplaces may be
              additionally governed by that marketplace&apos;s terms.
            </p>
          </div>
        </section>
      </Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const returnPolicy: WirePage = {
  id: "return-policy",
  title: "Return Policy",
  route: "/return-policy/",
  group: "Core Pages",
  Page: ReturnPolicyPage,
  notes: [
    {
      id: "n-hdr",
      anchor: "hdr",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared sticky `<Header>` on every page" },
        { sys: "brand", text: "Name = `RESTAURANT.name`; phone = `RESTAURANT.phone`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "`<BreadcrumbNav>` auto-injects `BreadcrumbList` schema" },
        { sys: "layout", text: "Home → Return Policy trail" },
      ],
    },
    {
      id: "n-policy-head",
      anchor: "policy",
      side: "right",
      title: "Policy Header",
      lines: [
        { sys: "color", text: "Eyebrow `.eyebrow`, H1 `--font-display`" },
        { sys: "seo", text: "Only H1; page injects `webPageSchema()`" },
      ],
    },
    {
      id: "n-policy-body",
      anchor: "policy",
      side: "left",
      title: "Policy Body (.prose-content)",
      lines: [
        { sys: "layout", text: "Static legal copy, `.prose-content` rhythm" },
        { sys: "color", text: "H2 headings + `--color-text` body" },
      ],
    },
    {
      id: "n-contact",
      anchor: "policy",
      side: "right",
      title: "Contact = brand data",
      lines: [
        { sys: "brand", text: "`RESTAURANT.phoneRaw` / `.phone` (tel link)" },
        { sys: "brand", text: "`RESTAURANT.email` (mailto), `address.full`" },
        { sys: "brand", text: "Legal entity = `RESTAURANT.legalName`" },
      ],
    },
    {
      id: "n-ftr",
      anchor: "ftr",
      side: "right",
      title: "Global Footer (dark)",
      lines: [
        { sys: "color", text: "Bg `--color-text`; bottom bar `--color-primary-dark`" },
        { sys: "brand", text: "Socials `RESTAURANT.socials.{instagram,facebook}`" },
      ],
    },
  ],
};
