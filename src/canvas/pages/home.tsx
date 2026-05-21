import type { WirePage } from "@/canvas/types";
import { Anno } from "@/wireframe/Anno";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import PressStrip from "@/components/home/PressStrip";
import ActionCards from "@/components/home/ActionCards";
import TrustBar from "@/components/home/TrustBar";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import BakerySpotlight from "@/components/home/BakerySpotlight";
import AboutIntro from "@/components/home/AboutIntro";
import Gallery from "@/components/home/Gallery";
import Reviews from "@/components/home/Reviews";
import InstagramSection from "@/components/home/InstagramSection";
import FAQSection from "@/components/home/FAQSection";
import OurLocation from "@/components/home/OurLocation";
import { FAQS } from "@/data/faqs";

// EXACT composition of src/app/page.tsx — real components, real CSS.
function HomePage() {
  return (
    <>
      <Anno id="hdr"><Header /></Anno>
      <Anno id="hero"><HeroBanner /></Anno>
      <Anno id="press"><PressStrip /></Anno>
      <Anno id="actions"><ActionCards /></Anno>
      <Anno id="trust"><TrustBar /></Anno>
      <Anno id="featured"><FeaturedDishes /></Anno>
      <Anno id="bakery"><BakerySpotlight /></Anno>
      <Anno id="about"><AboutIntro /></Anno>
      <Anno id="gallery"><Gallery /></Anno>
      <Anno id="reviews"><Reviews /></Anno>
      <Anno id="instagram"><InstagramSection /></Anno>
      <Anno id="faq"><FAQSection faqs={FAQS.slice(0, 6)} /></Anno>
      <Anno id="location"><OurLocation /></Anno>
      <Anno id="ftr"><Footer /></Anno>
    </>
  );
}

export const home: WirePage = {
  id: "home",
  title: "Home",
  route: "/",
  group: "Core Pages",
  Page: HomePage,
  notes: [
    {
      id: "n-hdr",
      anchor: "hdr",
      side: "left",
      title: "Global Header",
      lines: [
        { sys: "layout", text: "Shared sticky `<Header>` on every page" },
        { sys: "brand", text: "Logo + name = `RESTAURANT.name`; phone = `RESTAURANT.phone`" },
        { sys: "brand", text: "CTA = `RESTAURANT.orderOnline`" },
      ],
    },
    {
      id: "n-hero",
      anchor: "hero",
      side: "right",
      title: "HeroBanner",
      lines: [
        { sys: "color", text: "Italic accent `--color-primary`, H1 `--font-accent`" },
        { sys: "brand", text: "Rating = `RESTAURANT.ratingValue` / `reviewCount`" },
        { sys: "brand", text: "Image `/Images/hero.webp` → wireframe box" },
        { sys: "seo", text: "Only H1 on the page" },
      ],
    },
    {
      id: "n-press",
      anchor: "press",
      side: "left",
      title: "PressStrip",
      lines: [
        { sys: "brand", text: "Quote = `RESTAURANT.pressQuote.text` / `.source`" },
        { sys: "color", text: "Band bg `--color-sand`, quote `--font-accent`" },
      ],
    },
    {
      id: "n-actions",
      anchor: "actions",
      side: "right",
      title: "ActionCards",
      lines: [
        { sys: "layout", text: "Order Pickup / Order Delivery cards" },
        { sys: "brand", text: "Both link `RESTAURANT.orderOnline`; addr = `address.street`" },
      ],
    },
    {
      id: "n-trust",
      anchor: "trust",
      side: "left",
      title: "TrustBar",
      lines: [
        { sys: "layout", text: "3 icon columns (static copy)" },
        { sys: "color", text: "Hairline borders `--color-border`" },
      ],
    },
    {
      id: "n-featured",
      anchor: "featured",
      side: "right",
      title: "Products = parent → child",
      lines: [
        { sys: "product", text: "Source: `menu.ts` → `MENU`" },
        { sys: "product", text: "`flatMap` items where `popular:true`, slice 6" },
        { sys: "layout", text: "Horizontal hover-scroll carousel" },
      ],
    },
    {
      id: "n-bakery",
      anchor: "bakery",
      side: "left",
      title: "BakerySpotlight",
      lines: [
        { sys: "color", text: "Image-left / text-right, bg `--color-warm-white`" },
        { sys: "brand", text: "Eyebrow “Since 1919 · Four Generations”" },
      ],
    },
    {
      id: "n-reviews",
      anchor: "reviews",
      side: "right",
      title: "Reviews",
      lines: [
        { sys: "product", text: "Cards = `reviews.ts` → `REVIEWS`" },
        { sys: "layout", text: "“Leave a Review” → `ReviewModal` (Turnstile)" },
      ],
    },
    {
      id: "n-faq",
      anchor: "faq",
      side: "left",
      title: "FAQSection",
      lines: [
        { sys: "product", text: "`faqs.ts` → `FAQS.slice(0, 6)`" },
        { sys: "seo", text: "Injects `faqSchema()` (FAQPage)" },
      ],
    },
    {
      id: "n-instagram",
      anchor: "instagram",
      side: "right",
      title: "InstagramSection",
      lines: [{ sys: "brand", text: "Handle/link = `RESTAURANT.socials.instagram`" }],
    },
    {
      id: "n-location",
      anchor: "location",
      side: "left",
      title: "OurLocation",
      lines: [
        { sys: "brand", text: "`RESTAURANT.address` / `phone` / `hours`" },
        { sys: "seo", text: "Map embed → box; `LocalBusiness` schema" },
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
