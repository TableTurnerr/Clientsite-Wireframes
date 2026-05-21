import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ThemeBtn from "@/components/shared/ThemeBtn";
import SmartImage from "@/components/shared/SmartImage";
import { RESTAURANT } from "@/data/restaurant";

function OurStoryPage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="bc">
        <BreadcrumbNav
          items={[
            { name: "Home", url: "/" },
            { name: "Our Story", url: "/our-story/" },
          ]}
        />
      </Anno>

      <Anno id="article">
        <section className="container-pad py-12 md:py-20 max-w-3xl">
          <div className="eyebrow">Our Story</div>
          <h1 className="mb-8">The 100-Year Story of {RESTAURANT.region}&apos;s Best {RESTAURANT.servesCuisine} Bakery and Breakfast Café</h1>

          <SmartImage
            src="/Images/hero.webp"
            alt={`The ${RESTAURANT.brandShort} family kitchen — four generations of ${RESTAURANT.servesCuisine} bakers behind the baklava, kunafa and samoon served in ${RESTAURANT.address.city}, ${RESTAURANT.address.state}`}
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="aspect-[16/9] rounded-[var(--radius-section)] mb-12 shadow-[0_30px_80px_-30px_rgba(26,20,16,0.35)]"
          />

          <div className="prose-content space-y-6 text-[var(--color-text)] text-lg leading-relaxed">
            <h2 className="!mt-0 !mb-4">It All Started in {RESTAURANT.originCity}, {RESTAURANT.familyRecipeSince}</h2>
            <p>
              Our story begins not in {RESTAURANT.stateFull}, but in {RESTAURANT.originCity} — in {RESTAURANT.familyRecipeSince} — where our family first opened a bakery. <em>{RESTAURANT.brandShort}</em> — البغدادي — simply means <em>the one from {RESTAURANT.originCity}</em>, and for over a century, that name has meant the same thing wherever we&apos;ve stood: hand-made breads, {RESTAURANT.servesCuisine} sweets, and delicious {RESTAURANT.servesCuisine} dishes.
            </p>

            <h2 className="!mt-12 !mb-4">Authentic Traditional {RESTAURANT.servesCuisine} Sweets</h2>
            <p>
              The recipes have passed from one generation to the next — same techniques, same standards, same insistence that bread is sacred. The breads, the baklava, the ladyfingers stuffed with cream — these aren&apos;t recipes we found. They&apos;ve been in our family since {RESTAURANT.familyRecipeSince}, kept alive through war, migration, and the patience of teaching the next pair of hands.
            </p>

            <h2 className="!mt-12 !mb-4">Representing {RESTAURANT.servesCuisine} Heritage and Family Recipes in {RESTAURANT.stateFull}</h2>
            <p>
              Our father and master baker Salah Hassan, grew up learning about our traditional recipes and has been perfecting his craft for 50 years, following in the footsteps of his father. As D Magazine noted, he &lsquo;quietly turns out his wares&rsquo; with a skill that only comes from a lifetime of tradition. When you visit, you aren&apos;t just getting bread; you&apos;re getting a century of expertise from a true professional.
            </p>
            <p>
              In {RESTAURANT.founded}, he brought the family trade to {RESTAURANT.stateFull}, opening a small storefront on Greenville Avenue in {RESTAURANT.address.city} — two parking spots and a counter — and began to bake the way our family has always baked.
            </p>

            <h2 className="!mt-12 !mb-4">ضيافة — The Reason We Bake</h2>
            <p>
              For our father, this was never just about selling bread. It was about <em>ḍiyāfa</em> — {RESTAURANT.servesCuisine} hospitality. The belief that no one should leave your table hungry, that bread is sacred, that guests are a gift. He wanted his customers in {RESTAURANT.stateFull} to taste what he tasted growing up in {RESTAURANT.originCity} — the warmth of a kitchen where everything is made by hand.
            </p>

            <h2 className="!mt-12 !mb-4">Taste of Iraq in the Heart of {RESTAURANT.region}, {RESTAURANT.stateFull}</h2>
            <p>
              For over a decade now, our small breakfast place beside the barber shop has been a quiet landmark — a place loyal customers drive across Greenville Ave for, and where new neighbors discover their first bite of real {RESTAURANT.servesCuisine} baking.
            </p>

            <h2 className="!mt-12 !mb-4">Come See Us in the Morning, When the Bread is Hottest</h2>
            <p>
              The best time to find us is early, when the bread is freshest and the trays are just out. Come in for breakfast — a warm <em>samoon</em>, a piece of <em>baklava</em>, a <em>ladyfinger</em> with your chai — and let the day start the way it should and end your day with delicious kunafa in the evening.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-12">
            <ThemeBtn href="/menu/" variant="primary">See the Menu</ThemeBtn>
            <ThemeBtn href="/catering/" variant="secondary">Catering Inquiries</ThemeBtn>
          </div>
        </section>
      </Anno>

      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const ourStory: WirePage = {
  id: "our-story",
  title: "Our Story",
  route: "/our-story/",
  group: "Core Pages",
  Page: OurStoryPage,
  notes: [
    {
      id: "n-hdr",
      anchor: "hdr",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared sticky `<Header>` on every page" },
        { sys: "brand", text: "Logo + name = `RESTAURANT.name`; CTA = `RESTAURANT.orderOnline`" },
      ],
    },
    {
      id: "n-bc",
      anchor: "bc",
      side: "left",
      title: "BreadcrumbNav",
      lines: [
        { sys: "seo", text: "Auto-injects `breadcrumbSchema()` (BreadcrumbList)" },
        { sys: "layout", text: "Home → Our Story trail" },
      ],
    },
    {
      id: "n-heading",
      anchor: "article",
      side: "right",
      title: "Article Heading + Hero",
      lines: [
        { sys: "color", text: "Eyebrow `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Hero `/Images/hero.webp` (priority) → box" },
        { sys: "seo", text: "Only H1; `createMetadata()` title/canonical/OG" },
      ],
    },
    {
      id: "n-prose",
      anchor: "article",
      side: "right",
      title: "Prose Article (static copy)",
      lines: [
        { sys: "layout", text: "`prose-content` long-form, H2 section headings" },
        { sys: "seo", text: "Emits `articleSchema()` + `webPageSchema()`" },
        { sys: "brand", text: "Founder = Salah Hassan; since `RESTAURANT.familyRecipeSince`" },
      ],
    },
    {
      id: "n-color",
      anchor: "article",
      side: "left",
      title: "Body Type Tokens",
      lines: [
        { sys: "color", text: "Body `--color-text`; `<em>` accents for transliteration" },
      ],
    },
    {
      id: "n-cta",
      anchor: "article",
      side: "left",
      title: "Closing CTAs",
      lines: [
        { sys: "brand", text: "`ThemeBtn` → `/menu/` + `/catering/`" },
        { sys: "color", text: "`.btn-primary` `--color-primary`, `.btn-secondary`" },
      ],
    },
    {
      id: "n-ftr",
      anchor: "ftr",
      side: "left",
      title: "Global Footer (dark)",
      lines: [
        { sys: "color", text: "Bg `--color-text`; bottom bar `--color-primary-dark`" },
        { sys: "brand", text: "Socials `RESTAURANT.socials.{instagram,facebook}`" },
      ],
    },
  ],
};
