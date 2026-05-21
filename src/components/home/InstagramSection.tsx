"use client";

import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";
import SmartImage from "../shared/SmartImage";
import QRHover from "../shared/QRHover";

type Post = {
  id: string;
  caption: string;
  /** Descriptive alt text for SEO/accessibility — captions are display-only and can be hashtag-heavy. */
  alt: string;
  image: string;
  url: string;
  coAuthor?: string;
};

const POSTS: Post[] = [
  {
    id: "1",
    caption: "#dfweats #foodiefinds #yum #delicious #explore #followforfollowback",
    alt: "Iraqi sweets and bakery favorites at Al-Baghdady, halal Iraqi bakery in Richardson, TX",
    image: "/Images/instagram/post-1.webp",
    url: "https://www.instagram.com/p/DGElI-UOZ5q/",
  },
  {
    id: "2",
    caption: "Albaghdady Bakery & Sweets Richardson, TX Fresh, authentic",
    alt: "Fresh authentic Iraqi sweets at Albaghdady Bakery & Sweets in Richardson, TX",
    image: "/Images/instagram/post-2.webp",
    url: "https://www.instagram.com/p/DXb1QfjtwdQ/",
  },
  {
    id: "3",
    caption: "This is where to get authentic middle eastern",
    alt: "Authentic Middle Eastern food and Iraqi sweets at Al-Baghdady in Richardson, TX",
    image: "/Images/instagram/post-3.webp",
    url: "https://www.instagram.com/p/C7XimM_vLn0/",
  },
  {
    id: "4",
    caption: "IRAQI BREAKFAST DFW — We went back",
    alt: "Traditional Iraqi breakfast at Al-Baghdady, serving DFW from Richardson, TX",
    image: "/Images/instagram/post-4.webp",
    url: "https://www.instagram.com/p/DRh6XRJiWNa/",
  },
  {
    id: "5",
    caption: "Albaghdady is now serving authentic Iraqi breakfast",
    alt: "Authentic Iraqi breakfast spread — Kahi, Qeimar and samoon — at Al-Baghdady in Richardson, TX",
    image: "/Images/instagram/post-5.webp",
    url: "https://www.instagram.com/p/DRcx94JjmSW/",
  },
  {
    id: "6",
    caption: "Richardson, TX — We are back",
    alt: "Iraqi bakery and café favorites at Al-Baghdady in Richardson, TX",
    image: "/Images/instagram/post-6.webp",
    url: "https://www.instagram.com/p/DRK_1-FEZbU/",
  },
];

export default function InstagramSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handle = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 968) setColumns(2);
      else setColumns(3);
    };
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const cols: Post[][] = Array.from({ length: columns }, () => []);
  POSTS.forEach((post, i) => cols[i % columns].push(post));

  const hoveredColumnIndex = hoveredId
    ? POSTS.findIndex((p) => p.id === hoveredId) % columns
    : -1;

  return (
    <section className="section-pad">
      <div className="container-pad">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="eyebrow">@albaghdadyrestaurant</div>
          <h2 className="mb-4">Follow along on Instagram</h2>
          <p className="text-[var(--color-text-muted)]">
            New dishes, daily bakes, and the occasional behind-the-kitchen moment.
          </p>
        </div>

        <div className="flex gap-4 md:gap-5">
          {cols.map((columnData, columnIndex) => (
            <div key={columnIndex} className="flex-1 flex flex-col gap-4 md:gap-5">
              {columnData.map((post) => {
                const isHovered = post.id === hoveredId;
                const isInHoveredColumn = hoveredColumnIndex === columnIndex;
                const shouldCompress = isInHoveredColumn && !isHovered;

                let height = 360;
                if (isHovered) height = 460;
                else if (shouldCompress) height = 300;

                return (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Instagram post: ${post.caption}`}
                    onMouseEnter={() => setHoveredId(post.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative block rounded-2xl overflow-hidden cursor-pointer bg-white border border-[var(--color-border)] group"
                    style={{
                      height: `${height}px`,
                      transition:
                        "height 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                      boxShadow: isHovered ? "var(--shadow-lift)" : "none",
                      borderColor: isHovered ? "transparent" : "var(--color-border)",
                    }}
                  >
                    <SmartImage
                      src={post.image}
                      alt={post.alt}
                      sizes="(min-width: 968px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full"
                      style={{
                        transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                        transform: isHovered ? "scale(1.06)" : "scale(1)",
                      }}
                    />

                    <div
                      className="absolute inset-0 z-10 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(26,20,16,0) 35%, rgba(26,20,16,0.55) 75%, rgba(26,20,16,0.85) 100%)",
                        opacity: isHovered ? 1 : shouldCompress ? 0 : 0.7,
                      }}
                    />

                    <div
                      className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400"
                      style={{
                        background: isHovered ? "var(--color-primary)" : "rgba(255,255,255,0.92)",
                        color: isHovered ? "white" : "var(--color-text)",
                        opacity: shouldCompress ? 0 : 1,
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <Instagram size={16} strokeWidth={1.75} />
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 z-20 p-5 text-white transition-all duration-400"
                      style={{
                        opacity: shouldCompress ? 0 : 1,
                        transform: isHovered ? "translateY(0)" : "translateY(0)",
                      }}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-1.5">
                        {post.coAuthor
                          ? `@albaghdadyrestaurant & @${post.coAuthor}`.length <= 38
                            ? `@albaghdadyrestaurant & @${post.coAuthor}`
                            : `@${post.coAuthor}`
                          : "@albaghdadyrestaurant"}
                      </div>
                      <div
                        className="leading-snug transition-all duration-400"
                        style={{
                          fontSize: isHovered ? "1.05rem" : "0.9rem",
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {post.caption}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <QRHover value={RESTAURANT.socials.instagram}>
            <a
              href={RESTAURANT.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)] link-underline"
            >
              <Instagram size={16} strokeWidth={1.75} />
              Follow @albaghdadyrestaurant
            </a>
          </QRHover>
        </div>
      </div>
    </section>
  );
}
