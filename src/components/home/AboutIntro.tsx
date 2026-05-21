import Link from "next/link";

/**
 * DRAFT (2026-05-21) — topical homepage SEO content + internal links to the
 * specialty/menu/catering pages. Pending Hasham/client brand-voice review.
 * The homepage is the highest-authority page, so these internal links help
 * distribute authority across the specialty mesh.
 */
export default function AboutIntro() {
  return (
    <section className="bg-[var(--color-warm-white)] section-pad">
      <div className="container-pad max-w-3xl">
        <div className="eyebrow">Baghdad to Dallas</div>
        <h2 className="mb-5">A Family Iraqi Bakery &amp; Breakfast Café in Richardson, TX</h2>
        <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed">
          <p>
            Al-Baghdady is a halal Iraqi bakery and breakfast café in the heart of Richardson, serving the
            Dallas–Fort Worth area with recipes carried from Baghdad over four generations. Our in-house
            bakery fires fresh{" "}
            <Link href="/specialties/bread/" className="link-underline text-[var(--color-text)]">samoon and tandoor bread</Link>{" "}
            every morning and turns out trays of{" "}
            <Link href="/specialties/baklava/" className="link-underline text-[var(--color-text)]">baklava</Link>, hot{" "}
            <Link href="/specialties/kunafa/" className="link-underline text-[var(--color-text)]">kunafa</Link>,{" "}
            <Link href="/specialties/burma/" className="link-underline text-[var(--color-text)]">burma</Link> and cream-filled{" "}
            <Link href="/specialties/lady-fingers/" className="link-underline text-[var(--color-text)]">ladyfingers</Link>{" "}
            throughout the day.
          </p>
          <p>
            Mornings bring a full traditional{" "}
            <Link href="/specialties/breakfast/" className="link-underline text-[var(--color-text)]">Iraqi breakfast</Link> — Kahi
            &amp; Qeimar, Baqila, Kubba and the signature Albaghdady Plate — paired with cardamom{" "}
            <Link href="/specialties/chai/" className="link-underline text-[var(--color-text)]">karak chai</Link>. Browse the full{" "}
            <Link href="/menu/" className="link-underline text-[var(--color-text)]">menu</Link>, explore our{" "}
            <Link href="/specialties/" className="link-underline text-[var(--color-text)]">specialties</Link>, or order a sweets
            spread for Eid, a wedding or a Ramadan iftar through{" "}
            <Link href="/catering/" className="link-underline text-[var(--color-text)]">catering</Link>. Every item is 100% halal
            and Zabihah-verified.
          </p>
        </div>
      </div>
    </section>
  );
}
